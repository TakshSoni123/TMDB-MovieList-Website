import React from "react";

const Card = ({poster_path, name, first_air_date}) => {

    return (
        <>
        <div className="tv-card">
            <img className="tv-image" src={ 'https://image.tmdb.org/t/p/w500' + poster_path } alt="Loading..." ></img>
            <h1 className="tv-title">{name}</h1>
            <p className="tv-date">Release date : {first_air_date}</p>
        </div>
        </>
    );

};

export default Card;