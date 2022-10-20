import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MovieDesc = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState({});
    const [movieList, setMovieList] = useState([]);


    useEffect(() => {
        setMovieList(JSON.parse(localStorage.getItem('movieList')));
    }, [])

    useEffect(() => {
        console.log(movieList);
        
        for(var i=0; i<movieList.length;i++){
            
            if(movieList[i].ourId === parseInt(id)){
                // console.log("Found");
                setMovie(movieList[i])
            }
        }

        // console.log(movie);

    }, [id, movieList], []);

    return (
        <>
        <div className="headers">
            <div className="title">Movie description page</div>
        </div>

        <div className="navigators">
        <button className="prev" onClick={()=>{
            setMovieList(JSON.parse(localStorage.getItem('movieList')));
            for(var i=0; i<movieList.length;i++){
                
                if(movieList[i].ourId === (parseInt(id)-1)){
                    setMovie(movieList[i])
                }
            }
        }}><Link to={'/movie/details/'+(id-1)}> PREV </Link></button>

        <button className="next" onClick={()=>{
            setMovieList(JSON.parse(localStorage.getItem('movieList')));
            for(var i=0; i<movieList.length;i++){
                
                if(movieList[i].ourId === (parseInt(id)+1)){
                    setMovie(movieList[i])
                }
            }
        }}><Link to={'/movie/details/'+(parseInt(id)+1)}>NEXT </Link></button>
        </div>

        <div className="details">
            <img className="poster" src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path } alt="Loading..."></img>
            <div className="title">{movie.title}</div>
            <div className="desc">{movie.overview}</div>
        </div>
        
        </>
    );
}


export default MovieDesc;