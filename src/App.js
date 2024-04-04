import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import peli from './images/peli.png';

function App() {
  const API_URL= 'https://api.themoviedb.org/3'
  const API_KEY= 'bcd859f973059185f1886962c8ca75b1'
  const IMAGE_PATH= 'https://image.tmdb.org/t/p/original'
  const URL_IMAGE= 'https://image.tmdb.org/t/p/original'
  const [movies,setMovies]= useState([])
  const [searchKey,setSearchKey]= useState("")
  const [trailer,setTrailer]= useState(null);
  const [movie,setMovie]= useState({title:"loading Movies"});

  const fetchMovies = async(searchKey) =>{
    const type = searchKey ? "search": "discover"
    const {
      data:{ results},
    }= await axios.get(`${API_URL}/${type}/movie`,{
      params:{
        api_key:API_KEY,
        query:searchKey,
      },
    });

    setMovies(results)
    setMovie(results[0])
    if(results.length){
      await fetchMovie(results[0].id)
    }

    }

    const fetchMovie = async(id)=>{
     const {data} = await axios.get(`${API_URL}/movie/${id}`,{
      params:{
        api_key:API_KEY,
        append_to_response:"videos",
      },
     });


     setMovie(data)
    }

    const selectMovie = async(movie)=>{
     fetchMovie(movie.id)
     setMovie(movie)
     window.scrollTo(0, 0)
    }

    const searchMovies= (e)=>{
      e.preventDefault();
      fetchMovies(searchKey)
    }

    useEffect(()=>{
      fetchMovie();
    },[]);
  

  return (
    <div className="container mt-3">
      <h2 className='title mt-8 mb-8'>MOVIES</h2>
      <div className='text-center justify-center flex w-full mb-4'>
        <img src={peli} alt=''/>
      </div>
      <form className='container text-center font-bold justify-center py-2 mb-8 ' onSubmit={searchMovies}>
        <input type='text'placeholder='  *Enter movie*' className='bg-yellow-300 py-2 ml-2 rounded'onChange={(e)=> 
        setSearchKey(e.target.value)}/>
        <button className='btn btn-primary bg-yellow-500 ml-2 rounded-full'>Search</button>
      </form>
      <div>
       <div>
            <div
              className="flex min-h-screen bg-cover bg-center items-end"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}>
                <div className="container">
                  <div className="">
                   
                    <h1 className="text-yellow-500">{movie.title}</h1>
                    <p className="text-yellow-500">{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
       
      </div>
    <div className='container mt-3'>
      <div className='row'>
       {movies.map((movie)=>(
        <div key={movie.id} className='col-md-4 mb-3' onClick={()=> selectMovie(movie)}>
        <img src={`${URL_IMAGE + movie.poster_path}`} alt='' height={600} width='100%'/>
        <h4 className='text-center text-yellow-500 font-semibold'>{movie.title}</h4>
        </div>
       ))

       }
      </div>
    </div>
    </div>
  );
}

export default App;
