import React from "react";

const Movies = ({poster_path, name, release_date, vote_count, vote_average}) => {

    return (
        <>
        <div className="movie-item">
            <img className="movie-image" src={ 'https://image.tmdb.org/t/p/w500' + poster_path } alt="Loading..." ></img>
            
            <div className="movie-details">
                <h1 className="movie-title">{name}</h1>
                <div className="movie-extras">
                    <p>Release date : {release_date}</p>
                    <p>Number of votes : {vote_count}</p>
                    <p>Average rating : {vote_average}</p>
                </div>
            </div>
        </div>
        </>
    );

};

export default Movies;