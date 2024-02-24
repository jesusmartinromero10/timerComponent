import { LitElement, html, css } from 'lit';
//import { TimerPartComponent } from './TimerPartComponent.js';

export class TimerComponent extends LitElement {
  static properties = {
    dias: { type: Number, state: true },
    horas: { type: Number, state: true },
    minutos: { type: Number, state: true },
    segundos: { type: Number, state: true },
    format: { type: String, attribute: true },
    start: { type: Number },
    join: { type: String, attribute: true },
  };

  static styles = css`
  :host {
    display: flex;
    justify-content: center; 
}

  `;

  constructor() {
    super();
    this.start = 0;
    this.format = 'HH:MM:SS';
    this.join = ':';
    this.finishEvent = new CustomEvent('tiempoAcabado', {
      bubbles: true,
      composed: true,
    });
    this.playEvent = new CustomEvent('playTimer', {
      bubbles: true,
      composed: true,
    });
    this.pauseEvent = new CustomEvent('pauseTimer', {
      bubbles: true,
      composed: true,
    });
    this.resetEvent = new CustomEvent('resetTimer', {
      bubbles: true,
      composed: true,
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.resetValues();
  }

  disconnectedCallback() {
    this.final();
    super.disconnectedCallback();
  }

  render() {
    return html` ${this.timerTemplate()} `;
  }

  startTimer() {
    
    this.intervalId = setInterval(() => {
      this.contadorDeSegundos--;
      this.divideTiempo();
      if (this.contadorDeSegundos === 0) {
        clearInterval(this.intervalId); // Detiene el intervalo
        this.dispatchEvent(this.finishEvent);
      }
    }, 1000);
    this.dispatchEvent(this.playEvent);
  }

  resetTimer() {
    this.myClearInterval();
    this.resetValues();
    this.dispatchEvent(this.resetEvent);
  }

  pauseTimer() {
    this.myClearInterval();
    this.dispatchEvent(this.pauseEvent);
  }


  divideTiempo() {
    const seconds = this.contadorDeSegundos % 60;
    const minutes = Math.floor(this.contadorDeSegundos / 60) % 60;
    const hours = Math.floor(this.contadorDeSegundos / 3600);
    const days = Math.floor(this.contadorDeSegundos / 86400);
    this.segundos = seconds;
    this.minutos = minutes;
    this.horas = hours;
    this.dias = days;
  }

  resetValues() {
    this.segundos = 0;
    this.minutos = 0;
    this.horas = 0;
    this.dias = 0;
    this.contadorDeSegundos = this.start;
    this.divideTiempo();
  }

  myClearInterval() {
    clearInterval(this.intervalId);
  }

  final() {
    this.myClearInterval();
    this.dispatchEvent(this.finishEvent);
  }

timerTemplate() {
    const { format, dias, horas, minutos, segundos } = this;
    let template = [];
    let lastType = ''; 

    for (let i = 0; i < format.length; i++) {
        switch (format[i]) {
            case 'D':
                if (lastType !== 'D') {
                    template.push(dias);
                    lastType = 'D';
                }
                break;
            case 'H':
                if (lastType !== 'H') {
                    template.push(horas);
                    lastType = 'H'; 
                }
                break;
            case 'M':
                if (lastType !== 'M') {
                    template.push(minutos);
                    lastType = 'M';
                }
                break;
            case 'S':
                if (lastType !== 'S') {
                    template.push(segundos);
                    lastType = 'S'; 
                }
                break;
            default:
                template.push(format[i]);
                lastType = '';
        }
    }
    
    const arraySinDosPuntos = template.filter(item => item !== ':');
    
    const arrayTiempo = this.format.split(':');

    const templates = html`${arraySinDosPuntos.map(
              (value, index) => html`
                <time-part-component
                  value="${value}"
                  format="${arrayTiempo[index]}"
                ></time-part-component>
              `
            )}`;

    return html`${templates}`;
}


}
customElements.define('timer-component', TimerComponent);

TimerComponent.js;
