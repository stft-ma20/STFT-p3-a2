import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

let srch = "None"
function UserInput(props) {

  let yearsArr = [1989, 1995, 2000, 2001, 2002, 2003, 2008, 2010, 2020, 2021]
  let searchInputRef = useRef();
  let yearBtnsRef = useRef();
  let sortByRef = useRef();

  useEffect(() => {
    // console.log({ msg: "UI-useEffect " })
  }, [])

  return (
    <div className="row bg-secondary">
      <div className='d-flex align-items-center mx-1 text-light  '>
        <div className='d-flex w-50  '>
          <input ref={searchInputRef} defaultValue="bank" className='form-control w-100 p-1'></input>
          <Link to={"/search/" + srch}> <button className='btn bg-dark text-light mx-1' onClick={ () => { srch = searchInputRef.current.value; props.setSearch(searchInputRef.current.value) }}>Search</button></Link>
        </div>

        <div className='d-flex align-items-center justify-content-start mx-1 my-2'>
          <label style={{ fontSize: '1em', whiteSpace: 'nowrap' }} className='mx-1'>Sort</label>
          <select selected="Title" className='form-select w-auto m-1 text-start py-1' ref={sortByRef} onChange={() => { props.sortMedia(sortByRef.current.value) }}>
            <option value="Title">Title</option>
            <option value="Year">Year</option>
          </select>
        </div>
      </div>

      <div className='row mx-1 justify-content-start' ref={yearBtnsRef}>
        <Link to={"/"}  className='col-1  btn bg-black text-light m-2 py-0' onClick={() => { props.setYear("all") }}> All</Link>
        {yearsArr.map(
          (item, index) => {
            return (
              <Link to={"/year/" + item} key={item} className='col-1 w-auto btn text-light bg-black m-2 py-0' onClick={() => { props.setYear(item) }}> {item}</Link>
            )
          }
        )
        }
      </div>

    </div>
  )
}

export default UserInput