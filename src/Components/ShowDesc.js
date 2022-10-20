import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ShowDesc = () => {
    const { id } = useParams();
    var showList = [];

    const [show, setShow] = useState({});



    useEffect(() => {
        showList = JSON.parse(localStorage.getItem('showList'));
        for(var i=0; i<showList.length;i++){
            
            if(showList[i].ourId === parseInt(id)){
                // console.log("Found");
                setShow(showList[i])
            }
        }


    }, []);

    return (
        <>
        <div className="headers">TV Show description page</div>
        <div>{id}</div> 
        <div>{show.name}</div>

        <button onClick={()=>{
            showList = JSON.parse(localStorage.getItem('showList'));
            for(var i=0; i<showList.length;i++){
                
                if(showList[i].ourId === (parseInt(id)-1)){
                    setShow(showList[i])
                }
            }
        }}><Link to={'/tv/details/'+(id-1)}>PREV </Link></button>

        <button onClick={()=>{
            showList = JSON.parse(localStorage.getItem('showList'));
            for(var i=0; i<showList.length;i++){
                
                if(showList[i].ourId === (parseInt(id)+1)){
                    setShow(showList[i])
                }
            }
        }}><Link to={'/tv/details/'+(parseInt(id)+1)}>NEXT </Link></button>
        </>
    );
}


export default ShowDesc;