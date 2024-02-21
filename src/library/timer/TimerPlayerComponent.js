import { LitElement, html, css } from "lit";

export class TimerPlayerComponent extends LitElement {

    static properties={
        playBotton : {type : Boolean, attribute: "btn-play"},
        pausedBotton: {type:Boolean, attribute:"btn-paused"},
        resetBotton: {type:Boolean, attribute:"btn-reset"},
        msgfinish: {type:String, attribute:"finish-msg"},
        status:{type:String, state:true}
    }

    constructor(){
        super();

        this.playBotton= false,
        this.pausedBotton= false,
        this.resetBotton= false,
        this.msgfinish='Preparados',
        this.status=""
    }




    play() {
        this.timer.startTimer();
        this._status = '';
    }

    pause() {
        this.timer.pauseTimer();
    }

    reset() {
        this.timer.resetTimer();
        this._status = '';
    }
}
customElements.define('timer-player-component', TimerPlayerComponent);