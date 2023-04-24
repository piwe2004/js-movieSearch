import {Store} from '../core/core'

interface State{
    photo:string,
    name:string,
    email:string,
    github:string,
    repository:string
}

export default new Store<State> ({
    photo:'https://heropy.blog/css/images//logo.png',
    name:'HAO / KmMinGyu',
    email:'piwe2004@gmail.com',
    github:'https://github.com/piwe2004',
    repository:'https://github.com/piwe2004?tab=repositories'
})