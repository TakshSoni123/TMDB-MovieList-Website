import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ShowDesc = () => {
    const { id } = useParams();

    const [show, setShow] = useState({});
    const [showList, setShowList] = useState([]);


    useEffect(() => {
        setShowList(JSON.parse(localStorage.getItem('showList')));
    }, [])

    useEffect(() => {
        
        for(var i=0; i<showList.length;i++){
            
            if(showList[i].ourId === parseInt(id)){
                // console.log("Found");
                setShow(showList[i])
            }
        }


    }, [id, showList]);

    return (
        <>
        
        <div>{id}</div> 
        <div>{show.name}</div>

        <div className="headers">
            <div className="title">TV Show description page</div>
        </div>

        <div className="navigators">
        <button className="prev" onClick={()=>{
            setShowList(JSON.parse(localStorage.getItem('showList')));
            for(var i=0; i<showList.length;i++){
                
                if(showList[i].ourId === (parseInt(id)-1)){
                    setShow(showList[i])
                }
            }
        }}><Link to={'/tv/details/'+(id-1)}>PREV </Link></button>

        <button className="next" onClick={()=>{
            setShowList(JSON.parse(localStorage.getItem('showList')));
            for(var i=0; i<showList.length;i++){
                
                if(showList[i].ourId === (parseInt(id)+1)){
                    setShow(showList[i])
                }
            }
        }}><Link to={'/tv/details/'+(parseInt(id)+1)}>NEXT </Link></button>

</div>

        <div className="details">
            <img className="poster" src={ 'https://image.tmdb.org/t/p/w500' + show.poster_path } alt="Loading..."></img>
            <div className="title">{show.name}</div>
            <div className="desc">{show.overview}</div>
        </div>
        
        </>
    );
}


export default ShowDesc;