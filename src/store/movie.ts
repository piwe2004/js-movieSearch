import { Store } from './../core/core';

export interface SimpleMovie {
    Title: string
    Year: string
    imdbID: string
    Type: string
    Poster: string
}

interface DetailedMovie {
    Title: string
    Year: string
    Rated: string
    Released: string
    Runtime: string
    Genre: string
    Director: string
    Writer: string
    Actors: string
    Plot: string
    Language: string
    Country: string
    Awards: string
    Poster: string
    Ratings: {
        Source: string
        Value: string
    }[]
    Metascore: string
    imdbRating: string
    imdbVotes: string
    imdbID: string
    Type: string
    DVD: string
    BoxOffice: string
    Production: string
    Website: string
    Response: string
}

interface State{
    searchText:string
    page:number
    pageMax:number
    movies:SimpleMovie[]
    movie:DetailedMovie
    loading:boolean
    message:string 
}

const store = new Store<State>({
    searchText:'',
    page:1,
    pageMax:1,
    movies:[],
    movie:{} as DetailedMovie,
    loading:false,
    message : 'Serach for the movie title'
})

export default store
export const searchMovies = async (page:number) => {
    store.state.loading = true
    store.state.page = page
    if (page === 1){
        // 재검색시 리스트 초기화
        store.state.movies = []
        store.state.message = ''
    }
    try {
        //const res = await fetch(`https://www.omdbapi.com/?apikey=397d836c&s=${store.state.searchText}&page=${store.state.page}`);
        const res = await fetch('/api/movie',{
            method:'POST',
            body:JSON.stringify({
                title:store.state.searchText,
                page,
            })
        });
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

export const getMovieDetails = async (id:string) => {
    try {
        //const res = await fetch (`https://www.omdbapi.com/?apikey=397d836c&i=${id}&plot=full`)
        const res = await fetch('/api/movie',{
            method:'POST',
            body:JSON.stringify({
                id
            })
        });
        store.state.movie = await res.json()
        //console.log(store.state.movie)
    } catch (error) {
        console.log('getMovieDetail error: ', error)
    }
}