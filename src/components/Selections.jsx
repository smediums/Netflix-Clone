import React from 'react'
import Row from './Row'
import requests from './requests';

function Selections() {


    return (
        <div className="selections">
                <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
                <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </div>
    )
}

export default Selections
