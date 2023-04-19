import { Componet } from "./core/core";

export default class App extends Componet {
    constructor(){
        super({
            tagName: 'h1'
        })
    }
    render(){
        this.el.textContent = 'Hello, world!';
    }
}