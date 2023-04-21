import { Store } from './../core/core';

const store = new Store({
    searchText:'',
    page:1,
    pageMax:1,
    movies:[],
    loading:false
})

export default store
export const searchMovies = async page => {
    store.state.loading = true
    store.state.page = page
    if (page === 1){
        // 재검색시 리스트 초기화
        store.state.movies = []
    }
    const res = await fetch(`https://www.omdbapi.com/?apikey=397d836c&s=${store.state.searchText}&page=${store.state.page}`);
    const { Search, totalResults } = await res.json();
    store.state.movies = [
        ...store.state.movies,
        ...Search
    ]
    store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    store.state.loading = false
}