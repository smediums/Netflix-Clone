import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.scss";
import { infoIcon, playIcon } from "./icons";

const posterUrl = "https://image.tmdb.org/t/p/original/";

function Banner() {
  //Set initial showcase content
  const [movie, setMovie] = useState([]);

  //Once banner component is loaded, insert random movie using an async function with useEffect
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  //truncate overview text
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  //Return the JSX
  return (
    <header className="header">
      <img
        className="bannerImg"
        src={`${posterUrl}${movie.backdrop_path}`}
        alt=""
      />
      <div className="bannerContent">
        <h1 className="bannerHeading">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <h2 className="overview">{truncate(movie?.overview, 150)}</h2>
        <div className="btns">
          <button className="btn">{playIcon} Play</button>
          <button className="btn">{infoIcon} More Info</button>
        </div>
      </div>
    </header>
  );
}

export default Banner;
