import { LitElement, html, PropertyValues } from 'lit';
import { state, query, property } from 'lit/decorators.js';
import jsQR, { QRCode } from 'jsqr';
import { styles } from './index.css';
import '../components/CameraButton';
import '../components/CameraLoader';

type FacingMode = 'environment' | 'user';

export class QrWidget extends LitElement {
  static styles = styles;

  @property({ type: Function }) onResult?: (data: string) => void;
  @property({ type: Boolean, reflect: true }) immediate: boolean = false;

  @query('video') private videoEl!: HTMLVideoElement;
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  @state() private stream: MediaStream | null = null;
  @state() private codeResult: QRCode | null = null;
  @state() private facing: FacingMode = 'environment';
  @state() private cameras: MediaDeviceInfo[] = [];
  @state() private uploadSrc: string | null = null;

  private lastScan = 0;
  private scanInterval = 75;
  private clearTimer: number | null = null;

  firstUpdated() {
    this.initCameraList();
    this.videoEl.addEventListener('loadedmetadata', () => {
      this.resizeOverlay();
      requestAnimationFrame(this.scanLoop);
    });
  }

  protected update(changed: PropertyValues) {
    super.update(changed);
    if (changed.has('stream') && this.stream) {
      this.scanLoop();
    }
  }

  private resizeOverlay() {
    this.canvasEl.width = this.videoEl.videoWidth;
    this.canvasEl.height = this.videoEl.videoHeight;
  }

  private async initCameraList() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter((d) => d.kind === 'videoinput');
    } catch (err) {
      console.error('Failed to list cameras', err);
    }
  }

  public async openCamera() {
    if (!navigator.mediaDevices || !this.cameras.length) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: this.facing,
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      this.videoEl.srcObject = this.stream;
      await this.videoEl.play();
    } catch (err) {
      console.error('Camera access error', err);
    }
  }

  public closeCamera() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.codeResult = null;
    this.clearOverlay();
    this.clearCodeResult();
  }

  private clearOverlay() {
    const ctx = this.canvasEl.getContext('2d')!;
    ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  private clearCodeResult() {
    this.codeResult = null;
    if (this.clearTimer) {
      clearTimeout(this.clearTimer);
      this.clearTimer = null;
    }
  }

  private scanLoop = () => {
    if (!this.stream) return requestAnimationFrame(this.scanLoop);

    const now = performance.now();
    if (now - this.lastScan < this.scanInterval) {
      return requestAnimationFrame(this.scanLoop);
    }
    this.lastScan = now;

    const vw = this.videoEl.videoWidth;
    const vh = this.videoEl.videoHeight;
    if (!vw || !vh) return requestAnimationFrame(this.scanLoop);

    const ctx = this.canvasEl.getContext('2d', { willReadFrequently: true })!;

    ctx.drawImage(this.videoEl, 0, 0, vw, vh);

    const size = Math.floor(vw * 0.5);
    const x = Math.floor((vw - size) / 2);
    const y = Math.floor((vh - size) / 2);

    let img: ImageData;
    try {
      img = ctx.getImageData(x, y, size, size);
    } catch {
      return requestAnimationFrame(this.scanLoop);
    }

    const code = jsQR(img.data, size, size, {
      inversionAttempts: 'attemptBoth',
    });

    if (code) {
      this.codeResult = code;

      if (this.immediate) {
        this.handleResult();
      }
      const shift = (p: any) => ({ x: p.x + x, y: p.y + y });
      const loc = code.location;
      const pts = [
        shift(loc.topLeftCorner),
        shift(loc.topRightCorner),
        shift(loc.bottomRightCorner),
        shift(loc.bottomLeftCorner),
      ];
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.slice(1).forEach((p) => ctx.lineTo(p.x, p.y));
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'orange';
      ctx.stroke();

      if (this.clearTimer) clearTimeout(this.clearTimer);
      this.clearTimer = window.setTimeout(() => this.clearCodeResult(), 500);
    }

    requestAnimationFrame(this.scanLoop);
  };

  private handleResult() {
    if (!this.codeResult) return;
    this.onResult?.(this.codeResult.data);
    this.closeCamera();
  }

  private handleFileUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadSrc = reader.result as string;
      this.scanImageUpload();
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  private scanImageUpload() {
    const img = new Image();
    img.src = this.uploadSrc!;
    img.onload = () => {
      const ctx = this.canvasEl.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(data.data, img.width, img.height, {
        inversionAttempts: 'attemptBoth',
      });
      if (code) {
        this.codeResult = code;
        this.handleResult();
      } else {
        this.clearOverlay();
      }
    };
  }

  render() {
    return html`
      <div class="modal ${this.stream ? 'show' : ''}">
        <div class="modal-content">
          ${!this.stream ? html`<camera-loader></camera-loader>` : ''}

          <button
            class="close-button"
            @click=${() =>
              this.stream ? this.closeCamera() : this.openCamera()}
          >
            x
          </button>

          <video id="video" autoplay muted playsinline></video>
          <canvas id="overlay"></canvas>

          <div class="scan-area"></div>

          <div class="controls">
            <button class="controls__button">
              <input
                type="file"
                class="controls__file"
                @change="${this.handleFileUpload}"
                accept="image/*"
              />
              <div class="controls__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    fill="currentColor"
                    d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"
                  />
                </svg>
              </div>
              <p class="controls__text">Upload</p>
            </button>

            ${this.immediate
              ? ''
              : html` <camera-button
                  .disabled="${!this.codeResult}"
                  @on-click="${this.handleResult}"
                ></camera-button>`}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('qr-widget', QrWidget);
