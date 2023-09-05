import React, { useEffect, useState } from 'react';
import axios from '../API_Files/axios';
import Requests from '../API_Files/Requests';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );

      return request;
    }
    fetchData();
  }, []);

  let truncate = (string, n) => {
    return string?.length ? string.substr(0, n - 1) + '...' : string;
  };

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: 'center 15%',
      }}
    >
      <div className='banner-contents'>
        <h1 className='banner-title'>
          {movie?.original_name || movie?.name || movie?.title}
        </h1>
        <div className='banner-buttons'>
          <button className='banner-button'>Play</button>
          <button className='banner-button'>My List</button>
        </div>
        <h1 className='banner-description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className='banner-fadebottom' />
    </header>
  );
}
