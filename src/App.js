import { useEffect, useState } from 'react';
import axios from "axios";
import { sortBy } from "lodash";
import { BrowserRouter as Router, Routes, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import MediaListView from './comps/mediaListView';
import UserInput from './comps/inputComps/userInput';
import MovieInfo from './comps/movieInfo';




function App() {

  let [search, setSearch] = useState("bank")
  let [mediaArr, setMediaArr] = useState([]);
  let [sortType, setSortType] = useState();
  let [year, setYear] = useState("all");
  let [isLoading, setIsLoading] = useState(false);
  let [LoadingMessage,setLooadingMessage] = useState("Loading Movies...")
  
  useEffect(() => {  
    doAPI(search);
  }, [search, year, sortType]);
  

  const doAPI = async (_search) => {

    setIsLoading(true)
    // let resp = await fetch(url);
    // let data = await resp.json();
    let resp = await axios.get(`http://www.omdbapi.com/${""}?apikey=46cf0447${year == "all" ? "":"&y=" +year}&s=${_search}`)

    if (resp.data.Response == "True") {
      setMediaArr(sortBy(resp.data.Search, sortType))
      setIsLoading(false)
    } else {
      setLooadingMessage("There are no results :(");
    }
    
  }

  return (

      <Router>
        <div className="container bg-light  position-relative min-vh-100 ">
          <UserInput sortMedia={setSortType} setSearch={setSearch} setYear={setYear} />
          {isLoading ? <h2 className='display-3 position-absolute top-50 start-50 translate-middle'>{LoadingMessage}</h2> :
          <Switch>
            <Route exact path={["/", "/year/:yr", "/search/:searchQ"]} render={() =>
              <div >
                <MediaListView mediaArr={mediaArr} selectedYear={year} />
              </div>
            } >
            </Route>
            <Route exact path="/video/:id" component={MovieInfo} />
          </Switch>
          } 
        </div>
        <div style={{ height: "60px" }} className='d-flex container bg-secondary align-items-center justify-content-start  text-light '>
          <span className='mx-3'>Mul</span>
          <span className='mx-3'>2022</span>
          <hr />
          <a className='mx-3' href='https://github.com/stft-ma20/STFT-p3-a2'>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" className="bi bi-github text-primary" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
      </Router>

  );
}

export default App;
