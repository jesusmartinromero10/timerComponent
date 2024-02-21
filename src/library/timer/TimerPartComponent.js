import { LitElement, html, css, render  } from "lit";

export class TimerPartComponent extends LitElement{

    static properties = {

        fortmat:{type:String, attibute:true},
        value: {type:Number, attibute:true}

    }

    constructor(){
        super()
    }

    static styles = css`

        backgraund-color : green,
        color: white
    `;

    render() {
    
        return html`
        <div>${this.formatTimer(this.value)}</div>
        `
    }

    formatTime(timer) {
        if (this.format?.length > 1) return timer < 10 ? `0${timer}` : timer;
        return timer;
    }
}
customElements.define('time-part-component', TimerPartComponent);


