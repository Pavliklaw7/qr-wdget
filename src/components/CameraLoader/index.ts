import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property } from 'lit/decorators.js';

class CameraLoader extends LitElement {
  static styles = styles;

  @property({ type: Boolean }) disabled: boolean = false;

  render() {
    return html` <div class="loader"></div> `;
  }
}

customElements.define('camera-loader', CameraLoader);
