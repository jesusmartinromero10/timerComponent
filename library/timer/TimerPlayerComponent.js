import { LitElement, css, html } from 'lit';

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
      justify-content: center;
      flex-direction: column;
    }

    .status {
      color: #000; /* Color de texto para el estado */
      font-size: 16px; /* Tamaño de fuente para el estado */
      text-align: center; /* Alineación del texto del estado */
      margin: 10px 0; /* Margen del estado */
      padding: 10px; /* Relleno del estado */
    }

    .action {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      flex-direction: row;
      margin: 20px 0; /* Margen de las acciones */
    }

    button {
      cursor: pointer;
      padding: 10px 20px; /* Relleno de los botones */
      margin: 5px; /* Margen de los botones */
      border-radius: 5px; /* Radio del borde de los botones */
    }

    button.action--play {
      background-color: #28a745; /* Color de fondo del botón de reproducción */
      color: #fff; /* Color de texto del botón de reproducción */
      border: none; /* Borde del botón de reproducción */
    }

    button.action--pause {
      background-color: #dc3545; /* Color de fondo del botón de pausa */
      color: #fff; /* Color de texto del botón de pausa */
      border: none; /* Borde del botón de pausa */
    }

    button.action--reset {
      background-color: #007bff; /* Color de fondo del botón de reinicio */
      color: #fff; /* Color de texto del botón de reinicio */
      border: none; /* Borde del botón de reinicio */
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
      <div class="status">${this.status}</div>
      <slot></slot>
      <div class="action">
        <button
          class="action--pause"
          @click="${this.pause}"
        >
          Pause
        </button>
        <button
          class="action--play"
          @click="${this.play}"
        >
          Play
        </button>
        <button
          class="action--reset"
          @click="${this.reset}"
        >
          Reset
        </button>
      </div>
    `;
  }

  play() {
    if(this.botonPlay){
        this.timer.startTimer();
        this.status = 'Contando';
        this.botonPlay= !this.botonPlay
        this.botonPause= true
    }
  }

  pause() {
      if(this.botonPause){
          this.timer.pauseTimer();
          this.botonPlay= !this.botonPlay
          this.status = 'Pausado';
          this.botonPause = !this.botonPause

      }
  }

  reset() {
    this.timer.resetTimer();
    this.status = 'Empezamos';
    this.botonPlay= true;
  }
}
customElements.define('timer-player-component', TimerPlayerComponent);

TimerPlayerComponent.js;
