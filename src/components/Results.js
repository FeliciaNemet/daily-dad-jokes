import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";



const Results = ({ submit, userLimitChoice, searchTerm }) => {
  
  const [jokes, setJokes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const location = useLocation()

const displayJoke = (location.state);

  useEffect(() => {
    axios({
      url: `https://api.unsplash.com/search/photos`,
      dataResponse: `json`,
      method: `GET`,
      params: {
        client_id: `34_FRr4gH3efbjKeNMjRmPjTM8phiy64ND24X1GElr8`,
        query: searchTerm,
        per_page: 10,
      }
    }).then((response) => {
      setPhotos(response.data.results);
    })
  }, [searchTerm]);



  const randomNumber = Math.floor(Math.random() * 64);

  useEffect(() => {
    // setDisplayJoke(location.state);

    if (submit) {
      axios({
        url: `https://icanhazdadjoke.com/search`,
        dataResponse: `json`,
        method: `GET`,
        headers: {
          "Accept": "application/json"
        },
        params: {
          limit: userLimitChoice,
          page: randomNumber,
          total_jokes: 100
        }
      }).then((response) => {
        setJokes(response.data.results)
      })
    }
  }, [submit])


  return (
    <>
      { photos.map((photo) => {
          return (
            <div key={photo.id}>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </div>
          )
        })
      }
      {
        jokes.map((singularJoke) => {
          return (
            <div key={singularJoke.id}>
              <p>{singularJoke.joke}</p>
            </div>
          )
        })
      }

      {
      displayJoke.map((userDisplay, index) => {
        return(
          <div key={index}>
            <p>{userDisplay.joke}</p>
          </div>
        )
      })
      }
    </>

  )
}

export default Results;