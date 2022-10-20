import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ShowDesc = () => {
    const { id } = useParams();

    const [show, setShow] = useState({});
    const [showList, setShowList] = useState([]);


    useEffect(() => {
        setShowList(JSON.parse(localStorage.getItem('showList')));
        for(var i=0; i<showList.length;i++){
            
            if(showList[i].ourId === parseInt(id)){
                // console.log("Found");
                setShow(showList[i])
            }
        }


    }, [id, showList]);

    return (
        <>
        <div className="headers">TV Show description page</div>
        <div>{id}</div> 
        <div>{show.name}</div>

        <button onClick={()=>{
            setShowList(JSON.parse(localStorage.getItem('showList')));
            for(var i=0; i<showList.length;i++){
                
                if(showList[i].ourId === (parseInt(id)-1)){
                    setShow(showList[i])
                }
            }
        }}><Link to={'/tv/details/'+(id-1)}>PREV </Link></button>

        <button onClick={()=>{
            setShowList(JSON.parse(localStorage.getItem('showList')));
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