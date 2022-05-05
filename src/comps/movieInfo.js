import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MovieInfo(props) {
    let movieID = props.match.params.id;
    let [mov, setMov] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    let [LoadingMessage, setLooadingMessage] = useState("Loading Movie's Info...")
    let stars_ar = []


    const doMovieAPI = async (_movieID) => {
        setIsLoading(true)
        let url = `http://www.omdbapi.com/?i=${_movieID}&apikey=46cf0447`
        // let resp = await fetch(url);
        // let data = await resp.json();
        let resp = await axios(url);
        if (resp.data.Response == "True") {
            setMov(resp.data);
            setIsLoading(false)
        } else {
            setLooadingMessage("Error loading movie");
        }
    }

    const starsPrint = () => {
        let num = mov.imdbRating
        console.log("num eq : " + num)
        for (; num >= 1; --num) {
            stars_ar.push(1);
        }
        if (num >= 0.5) {
            stars_ar.push(0.5);
        }
    }

    useEffect(() => {
        doMovieAPI(movieID);
    }, [])

    return (
        <div className='row py-3 overflow-hidden h-100 border shadow '>
            {isLoading ? <h2 className='display-1 position-absolute top-50 start-50 translate-middle'>{LoadingMessage}</h2> :
                <React.Fragment>
                    <div className='col h-100 w-25 col-3 align-self-stretch '>
                        <img src={mov.Poster} className="me-3 img-fluid  border border-dark border-2  " alt="" />
                    </div>
                    <div className="col d-flex flex-column ">
                        <h1 className=''>{mov.Title}</h1>
                        <span><span className='fw-bold'>Release: </span> {mov.Year}</span>
                        <div className="mb-auto mt-2   ">
                            <span className='fw-bold'>Plot:</span>
                            <p className='m-0 p-0'>{mov.Plot}</p>
                        </div>

                        <span className='mt-auto p-0'><span className='fw-bold'>Rating: </span>{mov.imdbRating}</span>
                        <div className=' row  justify-content-center align-content-center ms-auto h-25    mb-0 w-50 '>

                            {starsPrint()}
                            {
                                stars_ar.map((item) => {
                                    if (item == 1) {
                                        return (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" fill="yellow" stroke='blue ' stroke-width="2%" className="col d-none  d-md-flex  text-danger bi bi-star-fill " viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                        )
                                    } else {
                                        return (

                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" fill="yellow" stroke='blue ' stroke-width="2%" className="col d-none d-md-flex text-danger bi bi-star-fill " viewBox="0 0 16 16">

                                                <mask id="myMask">
                                                    <rect width="100%" height="50%" fill="black" x="0" y="0" />
                                                    <rect width="100%" height="50%" fill="white" x="0" y="50%" />
                                                </mask>
                                                <path mask="url(#myMask)" d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                        )
                                    }
                                })

                            }
                            {

                                <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" stroke='blue ' stroke-width="2%" className=" mt-auto d-md-none  h-100 text-black bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    <text x="35%" y="65%" fill="white" font-size="0.25em" className=' '>{mov.imdbRating}</text>
                                </svg>


                            }
                        </div>

                    </div>
                </React.Fragment>
            }
        </div>
    )
}

export default MovieInfo