import React from "react";

import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './Home.js';
import ListView from './ListView';
import GalleryView from './GalleryView';
import MovieDesc from "./MovieDesc";
import ShowDesc from "./ShowDesc.js";

function AppRouter (){
  return  (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="movie/details/:id" element={<MovieDesc />} />
            <Route path="tv/details/:id" element={<ShowDesc />} />
        </Routes>
  )
 
}

export default AppRouter;
