import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MediaListView(props) {


    useEffect(() => {
    },[props.selectedYear])

    return (
        <div className="row justify-content-center moviesRow mt-2 px-1">
            {
                props.mediaArr.map(item => {
                        return (
                            <div key={item.Title} className="co-2 shadow mb-3 mx-1 col-sm-5 border overflow-hidden p-0 " >
                                <img src={item.Poster} className="float-start me-1 my-2 card border-secondary border-2 w-25" />
                                <div className='row h-100'>
                                    <h5 className='display-1 fw-bold fs-6'>{item.Title}</h5>
                                    <span className=' '><span className='fw-bold'>Release: </span> {parseInt(item.Year)}</span>
                                    <Link to={"/video/" + item.imdbID} className='w-auto btn btn-info  align-self-end mb-3 ms-2 '>More Info</Link>
                                </div>
                            </div>
                        )
                }
                )
            }
        </div>
        
    )
}
