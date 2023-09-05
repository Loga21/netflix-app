import axios from '../API_Files/axios';
import React, { useEffect, useState } from 'react';

export default function Row(props) {
  const Base_URL = 'https://image.tmdb.org/t/p/original/';
  const [rowMovies, setRowMovies] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      var response = await axios.get(props.fetchUrl);
      setRowMovies(response.data.results);
      return response;
    };
    fetchData();
  }, []);
  console.log(rowMovies);
  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='row-posters'>
        {rowMovies.map(
          (movie) =>
            ((props.isLargeRow && movie.poster_path) ||
              (!props.isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row-poster ${
                  props.isLargeRow && 'row-posterLarger'
                }`}
                key={movie.id}
                src={`${Base_URL}${
                  props.isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}
