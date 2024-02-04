import { useEffect, useRef, useState } from 'react'
import './App.css'
import userFetch from './hooks/userFetch';
import LocationCard from './components/LocationCard';
import ResidentCrd from './components/ResidentCrd';


function App() {
  // const [location, setLocation] = useState();
  const [location, getLocation, isLoading, hasError] = userFetch();
  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));


  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`
    getLocation(url)
  }, [finder]);
  // console.log(location)
  // console.log(randomLocation)
  // console.log(Location)
  const textInput = useRef();

  const handleSubmit = event => {
    event.preventDefault();
    setFinder(textInput.current.value.trim())
  }

  

  return (
    <>
      <div className='hero'>
        <div className='container'></div>
      </div>
      <div className='app'>
        {
          isLoading ?
            <h2>Loading...</h2>
            :
            <>
              <h1>Rick and Morty</h1>
              <form className='app-form' onSubmit={handleSubmit}>
                <input className='app-text' type="number" ref={textInput} placeholder='type a number (1 to 26)' />
                <button className='app-btn'>SEARCH</button>
              </form>
              {
                hasError || finder === '0' ?
                  <h2>This location do not exist</h2>
                  :
                  <>
                    <LocationCard
                      location={location}
                    />
                    <div className='app-container'>
                      {
                        location?.residents.map(resident => (
                          <ResidentCrd
                            key={resident}
                            url={resident}
                          />
                        ))
                      }
                    </div>
                  </>
              }
            </>
        }
      </div>
    </>
  )
}

export default App
