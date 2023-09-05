import React, { useEffect, useState } from 'react';
import '../Styles/HomeScreen.css';
import request from '../API_Files/Requests';
import axios from '../API_Files/axios';
import Requests from '../API_Files/Requests';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// import YouTube from 'react-youtube';
// import movieTrailer from 'movie-trailer';

export default function HomeScreen() {
  const [show, setShow] = useState(false);
  const [movie, setMovie] = useState({});

  const Base_URL = 'https://image.tmdb.org/t/p/original/';
  const [NetflixOriginals, setNetflixOriginals] = useState([]);
  const [TopRatedMovies, setTopRatedMovies] = useState([]);
  const [ActionMovies, setActionMovies] = useState([]);
  const [ComedyMovies, setComedyMovies] = useState([]);
  const [HorrorMovies, setHorrorMovies] = useState([]);
  const [RomanticMovies, setRomanticMovies] = useState([]);
  const [Documentary, setDocumentary] = useState([]);
  const [search, setSearch] = useState(false);
  const [filteredData, setFilterdata] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  var searchWord;

  //Nav
  const transitionNavBar = () => {
    if (window.scrollY > 250) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  //Banner

  let truncate = (string, n) => {
    return string?.length ? string.substr(0, n - 1) + '...' : string;
  };

  //Row

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(Requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      console.log(request);
      return request;
    }
    fetchData();

    let fetchNetflixOriginals = async () => {
      var response = await axios.get(request.fetchNetflixOriginals);
      setNetflixOriginals(response.data.results);
      setAllMovies(response.data.results);
      return response;
    };
    fetchNetflixOriginals();

    let fetchTopRated = async () => {
      var response = await axios.get(request.fetchTopRated);
      setTopRatedMovies(response.data.results);
      var newMlist = response.data.results;
      console.log(newMlist);
      newMlist.map((movie) => setAllMovies(allMovies.push(movie)));
      //setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchTopRated();

    let fetchActionMovies = async () => {
      var response = await axios.get(request.fetchActionMovies);
      setActionMovies(response.data.results);
      setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchActionMovies();

    let fetchComedyMovies = async () => {
      var response = await axios.get(request.fetchComedyMovies);
      setComedyMovies(response.data.results);
      setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchComedyMovies();

    let fetchHorrorMovies = async () => {
      var response = await axios.get(request.fetchHorrorMovies);
      setHorrorMovies(response.data.results);
      setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchHorrorMovies();

    let fetchRomanticMovies = async () => {
      var response = await axios.get(request.fetchRomanticMovies);
      setRomanticMovies(response.data.results);
      setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchRomanticMovies();

    let fetchDocumentaries = async () => {
      var response = await axios.get(request.fetchDocumentaries);
      setDocumentary(response.data.results);
      setAllMovies(allMovies.concat(response.data.results));
      return response;
    };
    fetchDocumentaries();
  }, []);
  // console.log(allMovies);

  var handleFilter = (e) => {
    searchWord = e.target.value;
    var newFilter = NetflixOriginals.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.original_name.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    setFilterdata(newFilter);
  };

  var handleKeys = () => {
    window.addEventListener('keyup', handleFilter);
  };

  // const opts = {
  //   height: '390',
  //   width: '100%',
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };
  // function _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }
  // const handleTrailer=(movie)=>{
  //   if(trailerUrl){
  //     setTrailerUrl("")
  //   }else{
  //     movieTrailer(movie?.original_name || movie?.name || movie?.title || "")
  //     .then((url)=>{
  //       const urlParams=new URLSearchParams(new URL(url).search);
  //       setTrailerUrl(urlParams.get('v'));
  //       console.log(urlParams);
  //     }).catch(e=>console.log(e))
  //   }
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className='Home-screen'>
      <div className={`nav ${show && 'nav-black'}`}>
        <div className='nav-contents'>
          <img
            className='nav-logo'
            src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
            alt='navLogo'
          />
          <div className='nav-inner-contents'>
            <Link className='nav-inners'>Home</Link>
            <Link className='nav-inners'>Tv Shows</Link>
            <Link className='nav-inners'>Movies</Link>
            <Link className='nav-inners'>My List</Link>
          </div>
          <div className='search-contents'>
            {search && (
              <div>
                <input
                  id='input'
                  type='text'
                  className='nav-searchbar'
                  onClick={handleKeys}
                />
                <CloseIcon
                  onClick={() => {
                    setSearch(false);
                    setFilterdata([]);
                  }}
                  className='close-icon'
                />
              </div>
            )}
          </div>
          {/* <div> */}
          {!search && (
            <SearchIcon
              onClick={() => setSearch(true)}
              className='search-icon'
            />
          )}
          <img
            className='nav-avatar'
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt='navAvatar'
          />
          {/* </div> */}
        </div>
      </div>
      {/* <Nav/> ******************************************************/}

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
          <h1 className='banner-description'>
            {truncate(movie?.overview, 200)}
          </h1>
        </div>
        <div className='banner-fadebottom' />
      </header>
      {/* <Banner/> **************************************************/}

      <div className='row'>
        <h2>Netflix Originals</h2>
        <div className='row-posters'>
          {filteredData.length
            ? filteredData.map((movie) => (
                <img
                  className='row-poster row-posterLarger'
                  key={movie.id}
                  src={`${Base_URL}${movie.poster_path}`}
                  alt={movie.name}
                  onClick={() => setMovie(movie)}
                />
              ))
            : NetflixOriginals.map((movie) => (
                <img
                  className='row-poster row-posterLarger'
                  key={movie.id}
                  src={`${Base_URL}${movie.poster_path}`}
                  alt={movie.name}
                  onClick={() => setMovie(movie)}
                />
              ))}
        </div>
      </div>

      <div className='row'>
        <h2>Top Rated</h2>
        <div className='row-posters'>
          {TopRatedMovies.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>

      <div className='row'>
        <h2>Action Movies</h2>
        <div className='row-posters'>
          {ActionMovies.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>

      <div className='row'>
        <h2>Comedy Movies</h2>
        <div className='row-posters'>
          {ComedyMovies.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>

      <div className='row'>
        <h2>Horror Movies</h2>
        <div className='row-posters'>
          {HorrorMovies.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>

      <div className='row'>
        <h2>Romantic Movies</h2>
        <div className='row-posters'>
          {RomanticMovies.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>

      <div className='row'>
        <h2>Documentaries</h2>
        <div className='row-posters'>
          {Documentary.map((movie) => (
            // ((props.isLargeRow && movie.poster_path) ||
            // (!props.isLargeRow && movie.backdrop_path)) &&(
            <img
              className='row-poster'
              key={movie.id}
              src={`${Base_URL}${movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => setMovie(movie)}
            />
            // )
          ))}
        </div>
      </div>
      {/* <Row
              title='Netflix Originals'
              fetchUrl={request.fetchNetflixOriginals}
              isLargeRow={true}
            />
            <Row
              title='Top Rated'
              fetchUrl={request.fetchTopRated}
            />
            <Row
              title='Action Movies'
              fetchUrl={request.fetchActionMovies}
            />
            <Row
              title='Comedy Movies'
              fetchUrl={request.fetchComedyMovies}
            />
            <Row
              title='Horror Movies'
              fetchUrl={request.fetchHorrorMovies}
            />
            <Row
              title='Romantic Movies'
              fetchUrl={request.fetchRomanticMovies}
            />
            <Row
              title='Documentaries'
              fetchUrl={request.fetchDocumentaries}
            /> */}
    </div>
  );
}
