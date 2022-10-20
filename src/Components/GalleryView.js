import React from "react";
import axios from "axios";

import Card from "./Card";
import { Link } from "react-router-dom";

class GalleryView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            shows : [],
            searchQuery : "",
            comedy : false,
            animated: false
        }
    }

    handleChange(event){
        try {
            this.setState({searchQuery : event.target.value});
        }catch(error){
            console.log(error);
        }
    }

    reset(){
        this.setState({comedy : false , animated : false});
    }


    async getTVShows(i){
        await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=80a29641d1701b345a02a17ef6800048&language=en-US&page='+i).then(res => {
            
            this.setState({shows : [...this.state.shows, res.data.results]})
            
        }).catch(error => {
          console.log(error);
        });
    }

    async unwindMovies(){
        var temp = [];
        var mov = this.state.shows;

        var titles = new Set();
        var k=0;
        for(var i=0;i<mov.length;i++){
            for(var j=0;j<mov[i].length;j++){
                if(!titles.has(mov[i][j].name)){
                        mov[i][j].ourId = k
                        temp.push(mov[i][j]);
                        titles.add(mov[i][j].name);
                        k+=1;
                }
                
            }
        }
        return temp;

    }

    async componentDidMount() {
        var i = 1;
        
        for(i=1; i<20;i++){
            await this.getTVShows(i)
        }

        await this.unwindMovies()
        .then((res) => {
            setTimeout(() => this.setState({shows : res}), 2000);
        });    
        
        setTimeout(() => console.log("movies"), 1000);
        setTimeout(() => console.log(this.state.shows), 1000);
        
        setTimeout(() => {
            this.setState({shows : [...new Set(this.state.shows)]})
        }, 1000)

        setTimeout(() => {
            localStorage.setItem('showList', JSON.stringify(this.state.shows));
        },5000)

    }

    render() {
        return (
            <>
            <div className="headers">
                <div className="title">TV Shows gallery</div>
                
                <input className="searchBox" placeholder="Input text to filter..." type='text' value={this.state.searchQuery} onChange={this.handleChange.bind(this)} />
                
                <div className="filters">
                    <button onClick={() => { 
                        this.setState({comedy : true });
                      }}>Comedy TV Shows</button>

                    <button onClick={() => {
                        this.setState({animated : true});
                    }}>Animated TV Shows</button>

                    {
                        this.state.comedy || this.state.animated ? 
                        <button onClick={this.reset.bind(this)}>Reset</button> : null
                    }
                </div>

            </div>
            <ul className="galleryView">
            {
                this.state.shows
                    .filter( d => this.state.searchQuery === '' || d.name.toLowerCase().includes(this.state.searchQuery.toLowerCase()))
                    .filter( d => 
                        this.state.comedy ? 
                        this.state.animated ? d.genre_ids.includes(16) && d.genre_ids.includes(35)  : d.genre_ids.includes(35)
                        : 
                        this.state.animated ? d.genre_ids.includes(16) : d
                    )
                    .map( x => {
                        return (
                            <Link to={'/tv/details/'+x.ourId}>
                                <Card poster_path = {x.poster_path} name={x.name} first_air_date={x.first_air_date} /> 
                            </Link>
                        )
                    })
            }
            </ul>
            </>
        )
    };
}


export default GalleryView;