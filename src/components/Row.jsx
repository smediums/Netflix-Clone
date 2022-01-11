import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const posterUrl = "https://image.tmdb.org/t/p/original/";
let count = 0;

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [nxtBtn, setNxtBtn] = useState(faAngleRight);
  const [prvBtn, setPrvBtn] = useState(faAngleLeft);
  const [translate, setTranslate] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

// Dynamic styles
  const slideAmount = {
    transform: `translateX(${translate}%)`,
  };
  const progressLine = {
    transform: `translateX(${progress}%)`,
  };

// Slider Btns
  const nxtSlide = (e) => {
    setTranslate(translate - 82);
    setProgress(progress + 100);
    count++;
    if (count === 6) {
      setTranslate(translate - 50);
    }
    if (count === 7) {
      setTranslate(translate - translate);
      setProgress(progress - progress);
      count = 0;
    }
  };

  const prvSlide = () => {
    count--;
    setTranslate(translate + 82);
    setProgress(progress - 100);

    if (count <= 0) {
      setTranslate(translate - translate);
    }
  };


  return (
    <div className="row">
      <header>
        <h2>
          {title}
          <FontAwesomeIcon className="explore" icon={faAngleRight} />{" "}
          <span className="allGenre">Explore All </span>
        </h2>
        <div className="indicators">
          <span className="indicate" style={progressLine}></span>
        </div>
      </header>

      {/* Movie poster slider */}
      <div
        className="rowContent"
        style={slideAmount}
        onMouseEnter={() => {
            console.log(translate)
            switch(translate){
                case -82:
                    count = 1;
                    break;
                case -164:
                    count = 2;
                    break;
                case -246:
                    count = 3;
                    break;
                case -328:
                    count = 4;
                    break;
                case -410:
                    count = 5;
                    break;
                case -460:
                    count = 6;
                    break;
                default:
                    count = 0;
            }
        }}
      >
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="rowPoster"
            src={`${posterUrl}${movie.backdrop_path}`}
            alt={movie.name || movie.original_title}
            loading="lazy"
          />
        ))}
      </div>

      {/* Slider btns */}
      <div
        className="nxt"
        onMouseOver={() => setNxtBtn(faChevronRight)}
        onMouseLeave={() => setNxtBtn(faAngleRight)}
        onClick={nxtSlide}
      >
        <FontAwesomeIcon icon={nxtBtn} />
      </div>
      <div
        className="prv"
        onMouseEnter={() => setPrvBtn(faChevronLeft)}
        onMouseLeave={() => setPrvBtn(faAngleLeft)}
        onClick={prvSlide}
      >
        <FontAwesomeIcon icon={prvBtn} />
      </div>
    </div>
  );
}

export default Row;
