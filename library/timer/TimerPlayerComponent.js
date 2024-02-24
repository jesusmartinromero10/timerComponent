import { LitElement, css, html } from 'lit';
//import { TimerComponent } from './TimerComponent.js';

export class TimerPlayerComponent extends LitElement {
  static properties = {
    status: { type: String, state: true },
    botonPlay: { type: Boolean, attribute: 'play-btn' },
    botonPause: { type: Boolean, attribute: 'pause-btn' },
    botonReset: { type: Boolean, attribute: 'reset-btn' },
    mensajeFinal: { type: String, attribute: 'end-msg' },
  };

  constructor() {
    super();
    this.botonPlay = false;
    this.botonPause = false;
    this.botonReset = false;
    this.mensajeFinal = '¡Listo!';
    this.status = '';
    this.addEventListener('tiempoAcabado', this.handletiempoAcabado);
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: var(--timer-player-component-justify-content, center);
      flex-direction: var(--timer-player-component-flex-direction, column);
    }

    .timer-player-component_status {
      color: var(--timer-player-component-status-color);
      font-size: var(--timer-player-component-status-font-size);
      text-align: var(--timer-player-component-status-text-align, center);
      margin: var(--timer-player-component-status-margin);
      padding: var(--timer-player-component-status-padding);
    }

    .timer-player-component__actions {
      display: flex;
      flex-wrap: var(--timer-player-component-actions-flex-wrap, wrap);
      justify-content: var(
        --timer-player-component-actions-justify-content,
        center
      );
      flex-direction: var(--timer-player-component-actions-flex-direction, row);
      margin: var(--timer-player-component-actions-margin);
    }

    button {
      cursor: pointer;
      padding: var(--timer-player-component-button-padding);
      margin: var(--timer-player-component-button-margin);
      border-radius: var(--timer-player-component-button-border-radius);
    }

    button.timer-player-component__actions--play {
      background-color: var(--timer-player-component-play-background-color);
      color: var(--timer-player-component-play-color);
      border: var(--timer-player-component-play-border);
    }

    button.timer-player-component__actions--pause {
      background-color: var(--timer-player-component-pause-background-color);
      color: var(--timer-player-component-pause-color);
      border: var(--timer-player-component-pause-border);
    }

    button.timer-player-component__actions--reset {
      background-color: var(--timer-player-component-reset-background-color);
      color: var(--timer-player-component-reset-color);
      border: var(--timer-player-component-reset-border);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.timer = this.querySelector('timer-component');
  }

  handletiempoAcabado() {
    this.status = this.mensajeFinal;
  }

  render() {
    return html`
      <div class="timer-player-component_status">${this.status}</div>
      <slot></slot>
      <div class="timer-player-component__actions">
        <button
              class="timer-player-component__actions--pause"
              @click="${this.pause}"
            >
              Pause
            </button>
        <button
              class="timer-player-component__actions--play"
              @click="${this.play}"
            >
              Play
            </button>
       <button
              class="timer-player-component__actions--reset"
              @click="${this.reset}"
            >
              Reset
            </button>
      </div>
    `;
  }

  play() {
    this.timer.startTimer();
    this.status = 'Contando';
  }

  pause() {
    this.timer.pauseTimer();
    this.status = "Pausado"
  }

  reset() {
    this.timer.resetTimer();
    this.status = 'Empezamos';
  }
}
customElements.define('timer-player-component', TimerPlayerComponent);

TimerPlayerComponent.js;
