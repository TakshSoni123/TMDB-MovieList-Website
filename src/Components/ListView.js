import React from "react";
import axios from 'axios';

import { Link } from "react-router-dom";
import Movies from "./Movies";


class ListView extends React.Component{
    

    constructor(props){
        super(props);
        this.state = {
            movies : [],
            searchQuery : "",
            sortDesc : false,
            sortDate : false
        }
    }

    handleChange(event){
        try {
            this.setState({searchQuery : event.target.value});
        }catch(error){
            console.log(error);
        }
        

    }

    sortAsc() {
        this.setState({sortDesc : false});
        this.setState({sortDate : false});
    }

    sortDesc() {
        this.setState({sortDesc : true});
        this.setState({sortDate : false});
    }

    sortByDate(){
        this.setState({sortDate : !this.state.sortDate});
    }

    async getMovieList(i){
        await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=80a29641d1701b345a02a17ef6800048&language=en-US&page='+i).then(res => {
            
            this.setState({movies : [...this.state.movies, res.data.results]})
            
        }).catch(error => {
          console.log(error);
        });
    }

    async unwindMovies(){

        var temp = [];
        var mov = this.state.movies;

        var titles = new Set();
        var k = 0;
        for(var i=0;i<mov.length;i++){
            for(var j=0;j<mov[i].length;j++){
                if(!titles.has(mov[i][j].title)){
                        mov[i][j].ourId = k;
                        temp.push(mov[i][j]);
                        titles.add(mov[i][j].title);
                        k+=1;
                }
                
            }
        }
        
        return temp;

    }

    async componentDidMount() {
        var i = 1;
        
        for(i=1; i<20;i++){
            var temp = []
            await this.getMovieList(i).then(async () => {
                temp = await this.unwindMovies();
            }).then(() => {
                // setTimeout(() => console.log(temp), 1000);
                setTimeout(() => this.setState({movies : temp}), 1000);
            });    
            
        }
        
        setTimeout(() => console.log("movies"), 1000);
        setTimeout(() => console.log(this.state.movies), 1000);
        
        setTimeout(() => {
            this.setState({movies : [...new Set(this.state.movies)]})
        }, 1000)

        setTimeout(() => {
            localStorage.setItem('movieList', JSON.stringify(this.state.movies));
        },1000)

    }

    render() {
        return (
            <>
            <div className="headers">
                <div className="title">Movie List</div>
                
                <input className="searchBox" placeholder="Input text to filter..." type='text' value={this.state.searchQuery} onChange={this.handleChange.bind(this)} />

                <div className="filters">
                    <button onClick={this.sortAsc.bind(this)}>A-Z</button>

                    <button onClick={this.sortDesc.bind(this)}>Z-A</button>

                    <button onClick={this.sortByDate.bind(this)}>Sort by release date</button>
                </div>

            </div>
            <ul className="listView">
            
            {
            this.state.sortDate ? 
                <div>{this.state.movies.filter( d => this.state.searchQuery === '' || d.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                .sort((a,b) => 
                    new Date(a.release_date) - new Date(b.release_date)
                )
                .map( x => {
                    return (
                        <Link to={'/movie/details/'+x.ourId} ><Movies poster_path = {x.poster_path} name={x.title} release_date={x.release_date} vote_count={x.vote_count} vote_average={x.vote_average}/>
                        </Link>
                    )
                })
                }</div>    :
                <div>
                    {
                    this.state.movies.filter( d => this.state.searchQuery === '' || d.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                    .sort((a,b) => 
                        this.state.sortDesc ? a.title > b.title ? -1 : 1 : a.title > b.title ? 1 : -1
                    )
                    .map( x => {
                        return (
                            <Link to={'/movie/details/'+x.ourId} ><Movies poster_path = {x.poster_path} name={x.title} release_date={x.release_date} vote_count={x.vote_count} vote_average={x.vote_average}/>
                            </Link>
                        )
                    })
                    }
                </div>
            }
            <div>{this.state.movies.filter( d => this.state.searchQuery === '' || d.title.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                .sort((a,b) => 
                    this.state.sortDesc ? a.title > b.title ? -1 : 1 : a.title > b.title ? 1 : -1
                ).sort((a,b) => 
                    this.state.sortDate ? a.release_date > b.release_date ? -1 : 1 : a.release_date > b.release_date ? 1 : -1
                )
                .map( x => {
                    
                    return (
                        <Link to={'/movie/details/'+x.ourId} ><Movies poster_path = {x.poster_path} name={x.title} release_date={x.release_date} vote_count={x.vote_count} vote_average={x.vote_average}/>
                        </Link>
                    )
                })
            }</div>
            </ul>
            </>
        )
    };
}


export default ListView;