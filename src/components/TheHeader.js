import { Component } from "../core/core";

export default class TheHeader extends Component{
    constructor (){
        super({
            tagName : 'header',
            state:{
                menus:[
                    {
                        name:'Search',
                        href:'/',
                    },
                    {
                        name:'movie',
                        href:'/movie?id=tt4520988'
                    },
                    {
                        name:'about',
                        href:'/about'
                    }
                ]
            }
        })
        window.addEventListener('popstate', ()=>{
            this.render();
        })
    }

    render(){
        this.el.innerHTML = `
            <a href="/" class="logo">
                <span>OMDbAPI.COM</span>
            </a>
            <nav>
                <ul>
                    ${this.state.menus.map(menu => {
                        const href = menu.href.split('?')[0];
                        const hash = location.pathname;
                        const isActive = href === hash ? 'active' : '';
                        return `
                            <li>
                                <a class="${isActive}" href="${menu.href}">
                                    ${menu.name}
                                </a>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </nav>
            <a href="/about" class="user">
                <img src="https://heropy.blog/css/images/logo.png">
            </a>
        `
    }
}