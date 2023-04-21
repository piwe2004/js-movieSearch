import { Store } from './../core/core';

const store = new Store({
    searchText:'',
    page:1,
    pageMax:1,
    movies:[],
    movie:{},
    loading:false,
    message : 'Serach for the movie title'
})

export default store
export const searchMovies = async page => {
    store.state.loading = true
    store.state.page = page
    if (page === 1){
        // 재검색시 리스트 초기화
        store.state.movies = []
        store.state.message = ''
    }
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=397d836c&s=${store.state.searchText}&page=${store.state.page}`);
        const { Search, totalResults, Response, Error } = await res.json();
        if(Response === 'True'){
            store.state.movies = [
                ...store.state.movies,
                ...Search
            ]
            store.state.pageMax = Math.ceil(Number(totalResults) / 10)
        }else {
            store.state.message = Error
        }
    } catch (error) {
        console.log('searchMovies error : ', error)
    }finally{
        store.state.loading = false
    }
        
}

export const getMovieDetails = async id => {
    try {
        const res = await fetch (`https://www.omdbapi.com/?apikey=397d836c&i=${id}&plot=full`)
        store.state.movie = await res.json()
        console.log(store.state.movie)
    } catch (error) {
        console.log('getMovieDetail error: ', error)
    }
}