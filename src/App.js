

import React, {useEffect, useState} from "react";


import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox.js";
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from "./components/RemoveFavourites";
const App =() =>{
    const [movies,setMovies]=useState([]);
    const [favourites, setFavourites]= useState([]);
    const [searchValue, setSearchValue]=useState ('');
const getMovieRequest = async () => {
  
  const url = 'http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8';

  const response= await fetch(url);
  const responseJson =await response.json();
  if(responseJson.Search){
    setMovies(responseJson.Search);
  }

};

useEffect(()=>{

  getMovieRequest(searchValue);
}, [searchValue]);


const AddFavouritesMovie=(movie) =>{
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
};

const RemoveFavouritesMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
};

  return (
  <div className="container-fluid movie-app"> 
  <div className="row d-flex align-items-center mt-4 mb-4">
  <MovieListHeading heading="Movies" />
   <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
   
  </div>
    <div className="row">    
    <MovieList movies={movies} handleFavouritesClick={AddFavouritesMovie} favouriteComponent={AddFavourites} />
    </div>
    <div className="row d-flex align-items-center mt-4 mb-4">
  <MovieListHeading heading="Favourites" />
  </div>
  <div className="row">    
    <MovieList 
    movies={favourites} 
    handleFavouritesClick={AddFavouritesMovie} 
    favouriteComponent={RemoveFavourites} />
    </div>
     </div>
  );
};


export default App;
