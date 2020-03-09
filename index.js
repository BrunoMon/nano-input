import {
    html,
    css,
    LitElement
} from "lit-element"

export class nanoInput extends LitElement {
    constructor() {
        super()
        this.type = "text"
        this.readonly = false
        this.disabled = false
        this.label = ""
        this._value = ""
        this.empty = true
        this.errorText = ""
        this.isValid = true
        this.leadingIcon = null
        this.noSpinner = false
        this.addEventListener("click", (e) => {
            this.focus()
        })
        this.addEventListener("touch", (e) => {
            this.focus()
        })
    }
    focus(e) {
        if (!this.readonly) this.shadowRoot.querySelector("#input").focus()
    }
    static get styles() {
        return css `
        :host
        {
            position:relative;
            display:grid;
            grid-template-columns:auto 1fr;
            border-bottom:1px solid var(--onsurface-color-helper);
            overflow-y:visible;
            min-height:3rem;
        }
        :host([type="button"]){
            border-bottom:none;
        }
        svg{
            align-self:center;
            justify-self:center;
            padding:.5rem;
            fill:var(--onsurface-color-helper);
            stroke:var(--onsurface-color-helper)
        }
        #lead{
            display:grid
        }
      
        #container{
            position:relative;
            display:grid
        }
        :host([disabled]) #input,
        :host([disabled]) svg,
        :host([disabled]) #helper,
        :host([disabled]) #label{
            color:var( --onsurface-color-disable);
            fill:var(--onsurface-color-disable);
            stroke:var(--onsurface-color-disable)
        }
        #input{
            position:absolute;
            color:inherit;
            bottom:0;
            border:none;
            width:95%;
            height:2rem;
            outline:none;
            background-color:transparent;
            font-family:inherit;
            font-size:inherit;
            left:.5rem;

        }
        label #label {
            pointer-events:none;
            position:absolute;
            display:grid;
            left:.5rem;
            margin:0;
            width:100%;
            height:100%;
            z-index:1;
            top:calc(100% - 2rem);
            transition:all .3s ease;
            color:var(--primary-color);
        }
        :host([type="button"]) label #label{
            transition:none;
            width:auto;
        }
        :host([type="button"])  #input{
            color:var(--onsurface-color-helper);
            font-size:.8rem;
        }

        :host(:not([type="checkbox"]):not([type="button"])) #input:focus + label #label, 
        :host(:not([empty])) #input + label #label,
        #input[type="date"] + label #label,
        #input[type="datetime-local"] + label #label{
            top:.4rem;
            font-size:.8rem
        }
        
        #input:focus + label #border{
            width:100%
        }
        :host([haveleading]) #input:focus + label #border{
            width:calc(100% + 2.5rem);
        }
        :host([haveleading]) #border{
            left:-2.5rem;
        }
        #border{
            clear:both;
            pointer-events:none;
            position:absolute;
            left:0;
            margin:0;
            width:0;
            height:auto;
            z-index:2;
            top:100%;
            transition:all .3s ease;
            border-bottom:2px solid var(--primary-color);
        }
        :host([type="button"]) #border{
            height:100%;
            background: linear-gradient(30deg,  transparent 0%, var(--primary-color) 200%);
            border-bottom:none;

        }
        #helper,#error{
            position:absolute;
            font-size:.7rem;
            top:100%;
            padding:.3rem
        }
        #helper{
            color:var(--onsurface-color-variant)
        }
        #error,:host(:not([is-valid])) #label{
            color:var(--error-color)
        }
        :host(:not([is-valid])) #helper{
            display:none
        }
        
        :host([is-valid]) #error{
            display:none
        }
        :host([no-spinner]) input::-webkit-outer-spin-button,
        :host([no-spinner]) input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        :host([no-spinner]) input[type=number] {
            -moz-appearance:textfield;
        }

        :host([type="checkbox"]) #input{
            opacity:0;
            width:1.5rem;
            height:1.5rem;
            justify-self:end
        }
        :host([type="checkbox"]) #input + label::after,:host([type="checkbox"]) #input + label::before{
            position:absolute;
            right:.5rem;
            top:50%;
            transform:translateY(-50%);
            content:"";
            width:1rem;
            height:1rem;
            border:2px solid;
            border-radius:.2rem;
            color:inherit;
            text-align:center;
            line-height: 1rem;
        }
        :host([type="checkbox"]) #input:checked + label::before{
            content:"✔";
            color:var(--primary-color)
        }
        
        `
    }

    render() {
        return html `
            <div id="lead">
                ${this.leadingIcon}
            </div>
            <div id="container">
                <input id="input" .value="${this.value}" .checked="${this.checked}" spellcheck="false" autocomplete="off" type="${this.type}" ?readonly=${this.readonly} ?disabled=${this.disabled} @change="${this.cambio}" @blur="${this.blur}">
                <label for="input">
                    <div id="label">${this.label}</div>
                    <div id="border"></div>
                </label>
                <div id="helper">${this.helper}</div>
                <div id="error">${this.errorText}</div>
            </div>
           
            `

    }
    static get properties() {
        return {
            label: {
                type: String,
                reflect: true
            },
            type: {
                type: String,
                reflect: true
            },
            readonly: {
                type: Boolean,
                reflect: true
            },
            helper: {
                type: String,
                reflect: true
            },
            isValid: {
                type: Boolean,
                attribute: "is-valid",
                reflect: true
            },
            empty: {
                type: Boolean,
                reflect: true
            },
            disabled: {
                type: Boolean,
                reflect: true
            },
            value: {
                type: String,
                reflect: true
            },
            errorText: {
                type: String,
                reflect: true
            },
            leadingIcon: {
                type: Object
            },
            haveLeading: {
                type: Boolean,
                reflect: true
            },
            disabled: {
                type: Boolean,
                reflect: true
            },
            noSpinner: {
                type: Boolean,
                reflect: true,
                attribute: "no-spinner",
            },
            checked: {
                type: Boolean,
                reflect: true
            }
        }

    }
    set leadingIcon(value) {
        const oldValue = this._leadingIcon;
        this._leadingIcon = value
        this.haveLeading = (this._leadingIcon != null)
        this.requestUpdate('leadingIcon', oldValue);
    }
    get leadingIcon() {
        return this._leadingIcon
    }
    set errorText(value) {
        const oldValue = this._errorText;
        this._errorText = value
        this.isValid = (this._errorText == "")
        this.requestUpdate('errorText', oldValue);
    }
    get errorText() {
        return this._errorText
    }

    cambio(e) {
        if (this.type != "checkbox") {
            this.value = e.currentTarget.value
        } else {
            this.checked = e.currentTarget.checked
            const ev = new Event("validating")
            this.dispatchEvent(ev)
        }
        //this.value = this.type != "checkbox" ? e.currentTarget.value : e.currentTarget.checked
    }

    set value(value) {
        const oldValue = this._value;
        this._value = value
        if (this.type != "checkbox") this.empty = (this._value == "")
        this.requestUpdate('value', oldValue);
        const ev = new Event("validating")
        this.dispatchEvent(ev)
    }
    get value() {
        return this._value
    }
    blur(e) {
        const ev = new Event("validating")
        this.dispatchEvent(ev)
    }
    validate() {
        const ev = new Event("validating")
        this.dispatchEvent(ev)
    }

}
window.customElements.define('nano-input', nanoInput);