import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal.show {
    display: flex;
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background: #000;
  }

  canvas,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }

  video {
    display: none;
  }

  .controls,
  .close-button {
    z-index: 999;
  }

  .controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
  }

  .controls__button {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    background: none;
    color: white;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .controls__button:disabled {
    color: gray;
    pointer-events: none;
  }

  .controls__button:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .controls__file {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .controls__icon {
    width: 24px;
  }

  .controls__text {
    font-size: 12px;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }

  .scan-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    background: rgba(0, 255, 0, 0.3);
    border: 2px solid #00ff00;
    z-index: 999;
  }

  .scan-overlay.show {
    display: block;
    animation: scanAnimation 1s ease-out;
  }

  .notify {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 0.5rem;

    border-radius: 25px;
    border: 1px solid green;

    background-color: lightgreen;
    z-index: 999;

    font-family: 'roboto';
  }

  .notify__message {
    max-width: 420px;
    margin: 0;
  }

  .uploaded-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
    z-index: 997;
  }

  @keyframes scanAnimation {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;
