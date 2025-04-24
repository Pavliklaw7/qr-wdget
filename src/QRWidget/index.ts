/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-debugger */
import { LitElement, PropertyValues, html } from 'lit';
import { state } from 'lit/decorators.js';
import jsQR, { QRCode } from 'jsqr';
import { styles } from './index.css';
import '../components/CameraButton';
import '../components/CameraLoader';

type INotifyType = 'success' | 'warning' | 'danger';

type IFacingMode = 'environment' | 'user';
interface INotify {
  display: boolean;
  message: string;
  type: INotifyType;
}
class QrScanner extends LitElement {
  static styles = styles;

  @state() private open: boolean = false;
  @state() private code: QRCode | null = null;
  @state() private videoElement: HTMLVideoElement | null = null;
  @state() private canvasElement: HTMLCanvasElement | null = null;
  @state() private canvasContext: CanvasRenderingContext2D | null = null;
  @state() private currentStream: MediaStream | null = null;
  @state() private imageUrl: string | null = null;
  @state() private showImage: boolean = false;
  @state() private cameras: MediaDeviceInfo[] = [];
  @state() private noCameras: boolean = false;
  @state() private singleCamera: boolean = false;
  // @state() private videoStarted: boolean = false;
  @state() private facingMode: IFacingMode = 'environment';
  @state() private notify: INotify = {
    display: false,
    type: 'success',
    message: '',
  };

  @state() private isMobile: boolean = false;

  firstUpdated() {
    this.videoElement = this.shadowRoot?.querySelector('video') || null;
    this.canvasElement = this.shadowRoot?.querySelector('canvas') || null;

    if (this.canvasElement) {
      this.canvasContext = this.canvasElement.getContext('2d');
    }

    this.videoElement?.addEventListener(
      'loadedmetadata',
      this.onVideoLoaded.bind(this)
    );

    this.checkСameras();
    this.checkIfMobile();
  }

  private checkIfMobile() {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileDevices = [
      'iphone',
      'ipod',
      'android',
      'blackberry',
      'windows phone',
      'opera mini',
    ];

    this.isMobile = mobileDevices.some((device) => userAgent.includes(device));
  }

  update(changedProperties: PropertyValues) {
    super.update(changedProperties);

    if (changedProperties.has('open') && this.open) {
      this.openCamera(this.facingMode);
    }
  }

  private checkСameras() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        this.cameras = devices.filter((device) => device.kind === 'videoinput');
        if (this.cameras.length === 0) {
          this.noCameras = true;
        } else if (this.cameras.length === 1) {
          this.singleCamera = true;
        } else {
          this.singleCamera = false;
        }
      })
      .catch((err) => console.log(err));
  }

  private onVideoLoaded() {
    const video = this.videoElement!;
    const canvas = this.canvasElement!;
    const { innerHeight, innerWidth } = window;
    const videoHeight = innerHeight;
    const videoWidth = Math.max(600, innerWidth);

    video.width = videoWidth;
    video.height = videoHeight;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    this.scanQRCode();
  }

  openCamera(facingMode: IFacingMode) {
    if (this.cameras.length === 0) {
      this.noCameras = true;
      return;
    }

    if (this.singleCamera || this.cameras.length > 1) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          this.currentStream = stream;
          this.videoElement!.srcObject = stream;
          this.videoElement!.play();
          this.open = true;
          this.scanQRCode();
        })
        .catch((err) => {
          console.log('Ошибка при получении доступа к камере:', err);
        });
    }
  }

  private scanQRCode() {
    const video = this.videoElement!;
    const canvas = this.canvasElement!;
    const context = this.canvasContext!;

    canvas.width = video.videoWidth || canvas.clientWidth;
    canvas.height = video.videoHeight || canvas.clientHeight;

    const scanFrame = () => {
      if (video.paused || video.ended) return;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height, {});

      if (code?.data) {
        this.code = code;
        this.drawRedFrame(code);
      }

      requestAnimationFrame(scanFrame);
    };

    scanFrame();
  }

  private drawRedFrame(code: QRCode) {
    const {
      topLeftCorner,
      topRightCorner,
      bottomRightCorner,
      bottomLeftCorner,
    } = code.location;
    const context = this.canvasContext!;

    context.beginPath();
    context.moveTo(topLeftCorner.x, topLeftCorner.y);
    context.lineTo(topRightCorner.x, topRightCorner.y);
    context.lineTo(bottomRightCorner.x, bottomRightCorner.y);
    context.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
    context.closePath();

    context.lineWidth = 10;
    context.strokeStyle = 'red';
    context.stroke();
  }

  private closeCamera() {
    if (this.currentStream) {
      const tracks = this.currentStream.getTracks();
      tracks.forEach((track) => track.stop());
      this.currentStream = null;
      this.imageUrl = null;
      this.showImage = false;
      // this.videoStarted = false;
    }
    this.toggleCamera();
  }

  public toggleCamera() {
    this.open = !this.open;
  }

  private switchCamera() {
    this.openCamera(this.facingMode === 'user' ? 'environment' : 'user');
  }

  private detectQRCode() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const video = this.videoElement!;

    if (!context) return console.log('No context available');

    canvas.width = video.videoWidth || canvas.clientWidth;
    canvas.height = video.videoHeight || canvas.clientWidth;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const qrCode = this.detectQRCodeFromImage(imageData);

    this.handleQRCodeData(this.code!);

    if (qrCode) {
      this.showScanAnimation();
    }
  }

  private detectQRCodeFromImage(imageData: ImageData) {
    return imageData.data.slice(0, 10).join('');
  }

  private handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.showImage = true;
          this.imageUrl = img.src;

          setTimeout(() => {
            this.closeCamera();
          }, 5000);

          this.scanImage(img);
        };
      };
      reader.readAsDataURL(file);
    }

    input.value = '';
  }

  private handleQRCodeData(code: QRCode) {
    if (code.data) {
      this.showNotify('QR Code scanned!', 'success');
      // do somethind
    } else {
      this.showNotify('QR Code not scanned, please, try again!', 'danger');
    }
    setTimeout(() => {
      this.closeCamera();
    }, 5000);
  }

  private scanImage(image: HTMLImageElement) {
    const canvas = this.canvasElement!;
    const context = this.canvasContext!;

    context.drawImage(image, 0, 0, image.width, image.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code) {
      this.drawRedFrame(code);
      this.handleQRCodeData(code);
      this.showScanAnimation();
    } else {
      this.handleEmptyData();
    }
  }

  private handleEmptyData() {
    this.showNotify('No QR code detected, please, try again!', 'warning');
  }

  private showScanAnimation() {
    const overlay = this.shadowRoot?.querySelector('.scan-overlay');
    overlay?.classList.add('show');
    setTimeout(() => overlay?.classList.remove('show'), 1000);
  }

  // private startVideo() {
  //   this.videoStarted = true;
  //   this.openCamera();
  //   this.videoElement!.play();
  // }

  private showNotify(message: string, type: INotifyType) {
    this.notify = {
      display: true,
      message: message,
      type: type,
    };

    setTimeout(() => {
      this.notify = {
        display: false,
        message: '',
        type: 'success',
      };
    }, 5000);
  }

  render() {
    return html`
      <div class="modal ${this.open ? 'show' : ''}">
        <div class="modal-content">
          ${!this.videoElement?.srcObject ? html`<camera-loader />` : ''}
          ${this.noCameras
            ? html`
                <div class="notify">
                  <p class="notify__message">No cameras Detected!</p>
                </div>
              `
            : ''}
          <div
            class="notify ${this.notify.type}"
            ?hidden="${!this.notify.display}"
          >
            <p class="notify__message">${this.notify.message}</p>
          </div>

          <button class="close-button" @click="${this.closeCamera}">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.1667 5.83171C14.3048 5.96984 14.3824 6.15721 14.3824 6.35254C14.3824 6.54787 14.3048 6.73524 14.1667 6.87338L11.0417 9.99836L14.1667 13.1234C14.3048 13.2615 14.3824 13.4489 14.3824 13.6442C14.3824 13.8396 14.3048 14.0269 14.1667 14.165C14.0285 14.3032 13.8412 14.3808 13.6459 14.3808C13.4505 14.3808 13.2631 14.3032 13.125 14.165L10 11.04L6.87502 14.165C6.73684 14.3032 6.5495 14.3808 6.35418 14.3808C6.15882 14.3808 5.97147 14.3032 5.83335 14.165C5.69522 14.0269 5.61757 13.8396 5.61762 13.6442C5.61762 13.4489 5.69517 13.2615 5.83335 13.1234L8.95835 9.99836L5.83335 6.87336C5.69521 6.73522 5.61758 6.5479 5.61761 6.35252C5.6176 6.15719 5.69517 5.96987 5.83335 5.83169C5.97147 5.69356 6.1588 5.61599 6.35418 5.61596C6.54951 5.61598 6.73688 5.69355 6.87502 5.83169L10 8.95669L13.125 5.83171C13.2631 5.69358 13.4505 5.61599 13.6458 5.61598C13.8412 5.61596 14.0285 5.69359 14.1667 5.83171Z"
                fill="#fff"
              />
            </svg>
          </button>
          <video id="video" playsinline autoplay muted></video>
          <canvas></canvas>

          ${this.showImage && this.imageUrl
            ? html`<img
                class="uploaded-img"
                src="${this.imageUrl}"
                alt="Uploaded image"
              />`
            : ''}

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

            <camera-button
              .disabled="${!this.code}"
              @on-click="${this.detectQRCode}"
            ></camera-button>

            <button
              class="controls__button"
              ?disabled="${!this.isMobile}"
              @click="${this.switchCamera}"
            >
              <div class="controls__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96l160 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32l0 32L160 64C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96l-160 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 160 0c88.4 0 160-71.6 160-160z"
                  />
                </svg>
              </div>
              <p class="controls__text">Switch Camera</p>
            </button>
          </div>

          <div class="scan-overlay"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('qr-widget', QrScanner);
