import React, { useEffect, useState, useRef } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Nav.scss";
import {
  faBell,
  faSearch,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const movieUrl = "https://image.tmdb.org/t/p/original/";
let count = 0;

function Nav() {
  const [show, setShow] = useState(false);
  const [drop, setDrop] = useState(false);
  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const [hideNotifications, setHideNotifications] = useState(false);
  const [notifyMovies, setNotifyMovies] = useState([]);
  const [notificationAmount, setNotificationAmount] = useState(
    (min = 4, max = 10) => {
      const difference = max - min;
      let randomNum = Math.floor(Math.random() * difference) + min;

      return randomNum;
    }
  );

  //Close nav
  const handleClose = () => {
    setDrop(false);
  };

  //Nav bg change on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  // search box typing event
  useEffect(() => {
    if (!search) {
      inputRef.current.focus();
    }
  }, [!search]);

  //Fetch movie data
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      const movieArr = request.data.results.splice(
        notificationAmount,
        notificationAmount
      );
      setNotifyMovies(movieArr);
      return movieArr;
    }
    fetchData();
  }, [hideNotifications]);

  // Close notifications
  const resetNotifications = () => {
    setHideNotifications(!hideNotifications);
    count++;
    if (count === 2) {
      setNotificationAmount(0);
      count = 0;
    }
  };

  // JSX
  return (
    <div className={`nav ${show && "blkNav"}`}>
      {/* Logo */}
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />

      {/* nav drop down */}
      <div
        className={`browse ${drop && "drop"}`}
        onMouseEnter={() => setDrop(!drop)}
        onMouseLeave={handleClose}
      >
        <p className="wrdBrowse">Browse</p>

        <FontAwesomeIcon className="browseIcon" icon={faSortDown} />

        <div className="navLinks">
          <ul
            className={`list ${drop && "drop"}`}
            onMouseLeave={() => setDrop(!drop)}
          >
            <li onClick={handleClose}>Home</li>
            <li onClick={handleClose}>TV Shows</li>
            <li onClick={handleClose}>Movies</li>
            <li onClick={handleClose}>Latest</li>
            <li onClick={handleClose}>My List</li>
          </ul>
        </div>
      </div>

      {/* search input box */}
      <div className={`searchBox ${search && "searchClick"}`}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Titles, people, genres"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {/* search icon */}
      <FontAwesomeIcon
        className="searchIcon"
        icon={faSearch}
        onClick={() => setSearch(!search)}
      />

      {/* Notification bell */}
      <div
        className={`bell ${hideNotifications && "show"}`}
        onClick={resetNotifications}
      >
        <FontAwesomeIcon icon={faBell} />

        {/* Num of notifications */}
        <span className="redCir">{notificationAmount}</span>

        {/* Notifications box */}
        <div
          className="notificationList"
          onMouseLeave={resetNotifications}
        >
          {notifyMovies.map((notifyMovie) => (
            <div key={notifyMovie.id} className="listItem">
              <img
                className="listImg"
                src={`${movieUrl}${notifyMovie.poster_path}`}
                alt={notifyMovie?.name || notifyMovie?.original_title}
              />
              <div className="summary">
                <h5>{notifyMovie?.name || notifyMovie?.original_title}</h5>
                <p>Released: {notifyMovie.release_date}</p>
                <p>
                  Popularity:{" "}
                  {`${((notifyMovie.popularity / 10000) * 100).toFixed(1)}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Avatar */}
      <img
        className="avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Avatar Icon"
      />
    </div>
  );
}

export default Nav;
