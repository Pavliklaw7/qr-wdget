import { css } from 'lit';

export const styles = css`
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-self: center;
    margin: 0 auto;
    width: fit-content;
    border-radius: 50px;
    background-color: transparent;
    border: 2px solid #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    padding: 2px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  :host(:active) {
    transform: scale(0.95);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .circle.disabled {
    opacity: 0.6;
    cursor: auto;
    pointer-events: none;
  }

  .circle__inner {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #ffffff;
  }

  :host(:hover) {
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
  }
`;
