import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property } from 'lit/decorators.js';

class CameraButton extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) disabled: boolean = false;

  render() {
    return html`
      <div
        class="circle ${this.disabled ? 'disabled' : ''}"
        @click="${() => this.dispatchEvent(new Event('on-click'))}"
      >
        <div class="circle__inner"></div>
      </div>
    `;
  }
}

customElements.define('camera-button', CameraButton);
