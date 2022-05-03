import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MovieInfo(props) {
    let movieID = props.match.params.id;
    let [mov, setMov] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    
    const doMovieAPI = async (_movieID) => {
        setIsLoading(true)
        let url = `http://www.omdbapi.com/?i=${_movieID}&apikey=46cf0447`
        // let resp = await fetch(url);
        // let data = await resp.json();
        let resp = await axios(url);
        setMov(resp.data)
        setIsLoading(false)
    }
    
    useEffect(() => {
        doMovieAPI(movieID);
    }, [])

    return (
        <div className='d-flex p-3 overflow-hidden '>
            { isLoading ? <h2 className='display-1 position-absolute top-50 start-50 translate-middle'>Loading...</h2> :
            <React.Fragment> 
            <img src={mov.Poster} className="me-3" alt="" />
            <div className="row">
                <h1 className=''>{mov.Title}</h1>
                <span className='display-5  p-1 '>{mov.Year}</span>
                <div className="h-100 mt-4">
                    <span className=''>Plot:</span>
                    <p >{mov.Plot}</p>
                </div>
            </div>
            </React.Fragment>
            }
        </div>
    )
}

export default MovieInfo