import { LitElement, html, PropertyValues } from 'lit';
import { state, query } from 'lit/decorators.js';
import jsQR, { QRCode } from 'jsqr';
import { styles } from './index.css';
import '../components/CameraButton';
import '../components/CameraLoader';

type NotifyType = 'success' | 'warning' | 'danger';
type FacingMode = 'environment' | 'user';

export class QrWidget extends LitElement {
  static styles = styles;

  // Query video and canvas elements in the template
  @query('video') private videoEl!: HTMLVideoElement;
  @query('canvas') private canvasEl!: HTMLCanvasElement;

  // Reactive state
  @state() private stream: MediaStream | null = null;
  @state() private codeResult: QRCode | null = null;
  @state() private facing: FacingMode = 'environment';
  @state() private cameras: MediaDeviceInfo[] = [];
  @state() private notify = {
    visible: false,
    message: '',
    type: 'success' as NotifyType,
  };
  @state() private showUploadPreview = false;
  @state() private uploadSrc: string | null = null;

  firstUpdated() {
    this.initCameraList();
    this.videoEl.addEventListener('loadedmetadata', () => {
      // размеры видео уже известны — можно гонять сканер
      this.scanLoop();
    });
  }

  protected update(changed: PropertyValues) {
    super.update(changed);
    // If we have a stream changed, start scanning
    if (changed.has('stream') && this.stream) {
      this.scanLoop();
    }
  }

  // Enumerate available video input devices
  private async initCameraList() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.cameras = devices.filter((d) => d.kind === 'videoinput');
    } catch (err) {
      console.error('Failed to list cameras', err);
    }
  }

  // Open camera with given facing mode
  public async openCamera() {
    if (!navigator.mediaDevices || !this.cameras.length) {
      this.showNotification('No cameras found', 'warning');
      return;
    }
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.facing },
      });
      this.videoEl.srcObject = this.stream;
      await this.videoEl.play();
    } catch (err) {
      console.error('Camera access error', err);
      this.showNotification('Camera access denied', 'danger');
    }
  }

  // Close and stop the video stream
  public closeCamera() {
    this.stream?.getTracks().forEach((t) => t.stop());
    this.stream = null;
    this.codeResult = null;
  }

  // Continuous scan loop using requestAnimationFrame
  private scanLoop() {
    if (!this.stream) return;

    const w = this.videoEl.videoWidth;
    const h = this.videoEl.videoHeight;

    // Если метаданных ещё нет — ждём
    if (w === 0 || h === 0) {
      return requestAnimationFrame(() => this.scanLoop());
    }

    // Устанавливаем размеры canvas только когда они ненулевые
    this.canvasEl.width = w;
    this.canvasEl.height = h;

    const ctx = this.canvasEl.getContext('2d')!;
    ctx.drawImage(this.videoEl, 0, 0, w, h);

    let imageData: ImageData;
    try {
      imageData = ctx.getImageData(0, 0, w, h);
    } catch (e) {
      // на всякий случай защитимся, хотя теперь ошибок уже не будет
      console.warn('getImageData failed, retrying next frame', e);
      return requestAnimationFrame(() => this.scanLoop());
    }

    const code = jsQR(imageData.data, w, h, {
      inversionAttempts: 'attemptBoth',
    });
    if (code) {
      this.codeResult = code;
      this.drawFrame(code.location);
      this.handleResult(code);
      return; // если нужно остановить после первого успешного скана
    }

    requestAnimationFrame(() => this.scanLoop());
  }

  // Draw a rectangle around detected QR code
  private drawFrame(loc: QRCode['location']) {
    const ctx = this.canvasEl.getContext('2d')!;
    ctx.beginPath();
    ctx.moveTo(loc.topLeftCorner.x, loc.topLeftCorner.y);
    ctx.lineTo(loc.topRightCorner.x, loc.topRightCorner.y);
    ctx.lineTo(loc.bottomRightCorner.x, loc.bottomRightCorner.y);
    ctx.lineTo(loc.bottomLeftCorner.x, loc.bottomLeftCorner.y);
    ctx.closePath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'red';
    ctx.stroke();
  }

  // Handle the decoded QR code result
  private handleResult(code: QRCode) {
    // this.showNotification(`Scanned: ${code.data}`, 'success');
    console.log('code', code.data);
    // setTimeout(() => {
    //   this.closeCamera()
    // }, 1500)
  }

  // Toggle between front and back cameras
  private async switchCamera() {
    this.facing = this.facing === 'environment' ? 'user' : 'environment';
    if (this.stream) {
      this.closeCamera();
      await this.openCamera();
    }
  }

  // Handle image file uploads
  private handleFileUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadSrc = reader.result as string;
      this.showUploadPreview = true;
      this.scanImageUpload();
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  // Scan QR code from uploaded image
  private scanImageUpload() {
    const img = new Image();
    img.src = this.uploadSrc!;
    img.onload = () => {
      const ctx = this.canvasEl.getContext('2d')!;
      this.canvasEl.width = img.width;
      this.canvasEl.height = img.height;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsQR(data.data, img.width, img.height, {
        inversionAttempts: 'attemptBoth',
      });
      if (code) {
        this.drawFrame(code.location);
        this.handleResult(code);
      } else {
        this.showNotification('No QR code found', 'warning');
      }
    };
  }

  // Display temporary notifications
  private showNotification(message: string, type: NotifyType) {
    this.notify = { visible: true, message, type };
    setTimeout(() => (this.notify.visible = false), 4000);
  }

  render() {
    return html`
      <div class="modal ${this.stream ? 'show' : ''}">
        ${!this.stream ? html`<camera-loader></camera-loader>` : ''}
        <button
          @click=${() => (this.stream ? this.closeCamera() : this.openCamera())}
        >
          ${this.stream ? 'Close' : 'Open'}
        </button>
        <video autoplay muted playsinline></video>
        <canvas></canvas>
        <div class="controls">
          <button
            @click=${this.switchCamera}
            ?disabled=${this.cameras.length < 2}
          >
            Switch
          </button>
          <input
            type="file"
            accept="image/*"
            @change=${this.handleFileUpload}
          />
        </div>
        ${this.notify.visible
          ? html`<div class="notify ${this.notify.type}">
              ${this.notify.message}
            </div>`
          : ''}
      </div>
    `;
  }
}

customElements.define('qr-widget', QrWidget);
