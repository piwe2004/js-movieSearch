import { Component } from "../core/core";
import aboutStore from '../store/about'

export default class TheFooter extends Component{
    constructor(){
        super({
            tagName: 'footer'
        })
    }
    render(){
        const {gibhub, repository} = aboutStore.state
        this.el.innerHTML = `
            <div>
                <a href="${repository}">
                    GitHub Repository
                </a>
            </div>
            <div>
                <a href="${gibhub}">
                    ${new Date().getFullYear()}
                    Kim
                </a>
            </div>
        `  
    }
}