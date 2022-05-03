import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MediaListView(props) {

    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    },[props.selectedYear])

    return (
        <div className="row moviesRow mt-2 px-1">
            {
                props.mediaArr.map(item => {
                    if (props.selectedYear == "all" || parseInt(item.Year) == props.selectedYear) {
                        return (
                            <div key={item.Title} className="co-2 col-sm-4 border overflow-hidden p-0 " >
                                <img src={item.Poster} className="float-start me-1 card border border-2 w-25" />
                                <div className='row h-100'>
                                    <h5 className='fs-6'>{item.Title}</h5>
                                    <span className=' '>{parseInt(item.Year)}</span>
                                    <Link to={"/video/" + item.imdbID} className='w-auto btn btn-info  align-self-end mb-3 ms-2 '>More Info</Link>
                                </div>
                            </div>
                        )
                    }
                }
                )
            }
        </div>
        
    )
}
