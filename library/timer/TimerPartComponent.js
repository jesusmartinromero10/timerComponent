
import { LitElement, html, css } from 'lit';

export class TimerPartComponent extends LitElement {
    static get properties() {
        return {
            value: { type: Number, attribute: true },
            format: { type: String, attribute: true }
        };
    }

    constructor() {
        super();
        this.value = 0;
        this.format = '';
    }

    static styles = css`
        :host {
            color: red;
            background-color: lightgray;
            padding: 5px;
            border-radius: 5px;
            margin: 2px;
            display: inline-block;
        }
    `;

    render() {
        return html`
            <div>${this.formatTime(this.value)}</div>
        `;
    }

    formatTime(time) {
        //console.log('format',this.format)
        console.log('time',time)
        if (this.format === 'HH') {
            return time < 10 ? `0${time} hours` : `${time} hours`;
        } else if (this.format === 'MM') {
            return time < 10 ? `0${time} minutes` : `${time} minutes`;
        } else if (this.format === 'SS') {
            return time < 10 ? `0${time} second` : `${time} seconds`;
        }
        return '';
    }
}
customElements.define('time-part-component', TimerPartComponent);
TimerPartComponent.js
