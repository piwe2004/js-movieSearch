import { Component } from "../core/core";
import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component{
    constructor() {
        super({
            tagName: 'button'
        });
        movieStore.subscribe('pageMax', ()=>{
            const {page, pageMax} = movieStore.state
            page < pageMax 
                ? this.el.classList.remove('hide') 
                : this.el.classList.add('hide');
        })
    }
    render(){
        this.el.classList.add('btn', 'view-more', 'hide')
        this.el.textContent ='View More'

        this.el.addEventListener('click', async ()=>{
            await searchMovies(movieStore.state.page + 1)
        })
    }
    
}