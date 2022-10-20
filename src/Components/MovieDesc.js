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
        <div className="headers">Movie description page</div>
        <div>{id}</div> 
        <div>{movie.title}</div>

        <button onClick={()=>{
            setMovieList(JSON.parse(localStorage.getItem('movieList')));
            for(var i=0; i<movieList.length;i++){
                
                if(movieList[i].ourId === (parseInt(id)-1)){
                    setMovie(movieList[i])
                }
            }
        }}><Link to={'/movie/details/'+(id-1)}>PREV </Link></button>

        <button onClick={()=>{
            setMovieList(JSON.parse(localStorage.getItem('movieList')));
            for(var i=0; i<movieList.length;i++){
                
                if(movieList[i].ourId === (parseInt(id)+1)){
                    setMovie(movieList[i])
                }
            }
        }}><Link to={'/movie/details/'+(parseInt(id)+1)}>NEXT </Link></button>
        </>
    );
}


export default MovieDesc;