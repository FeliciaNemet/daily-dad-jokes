// Modules
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useLocation, Link } from "react-router-dom";
// Results.js
const Results = ({ submit, userLimitChoice, searchTerm }) => {
  const [randomJokes, setRandomJokes] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [userData, setUserData] = useState([]);
  const [delay, setDelay] = useState(10000);
  const location = useLocation();
  const usersJokes = (location.state);
  const totalJokes = [...randomJokes, ...usersJokes];
   // randomNumber variable will allow us to get 10 random jokes and photos from the icanhazdadjokes API & unsplash API
  const randomNumber = Math.floor(Math.random() * 30);
  // calling unsplash API data to get 10 photos. 
  useEffect(() => {
    axios({
      url: `https://api.unsplash.com/search/photos`,
      dataResponse: `json`,
      method: `GET`,
      params: {
        client_id: `34_FRr4gH3efbjKeNMjRmPjTM8phiy64ND24X1GElr8`,
        query: searchTerm,
        page: randomNumber,
        per_page: 10,
      }
    }).then((response) => {
      setPhotos(response.data.results);
    }).catch((error) => {
      alert(`Something went wrong! Here is a dad joke to sparkle your day: I went to this TV repairman's wedding. The reception was great.`)
    })
  }, [searchTerm]);
  // create an icanhazdadjokes API call to get 10 jokes
  useEffect(() => {
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
        setRandomJokes(response.data.results)
      }).catch((error) => {
        alert(`Something went wrong! Here is a dad joke to sparkle your day: I went to this TV repairman's wedding. The reception was great.`)
      })
    }
  }, [submit])
  // creating a new array with the data of the photos and the jokes combined into each objects
  // create this array within a useEffect so that it will render after all the jokes are loaded
  useEffect(() => {
    if (photos.length > 0 && randomJokes.length > 0) {
    const newArray = photos.map((singularPhoto, index) => {
      return { ...singularPhoto, jokes: totalJokes[index] }
    })
    setUserData(newArray)
  }
  }, [randomJokes, photos])
  // Slideshow, creating the 30sec delay
  // followed tutorial from: https://tinloof.com/blog/how-to-build-an-auto-play-slideshow-with-react
  // const delay = 30000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === photos.length - 1
            ? alert("Thank you for Coming by. Hope you have a Great Day! 😊😊")
            : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <section className='wrapper'>
      <form action="">
          <label  className="sr-only" htmlFor="dropDown">Timing</label>
          <select className="dropDown"
            id="time"
            name="time"
            onChange={(e) => setDelay(e.target.value)}
            value={delay}
          >
            <option value="10000">10 seconds</option>
            <option value="15000">15 seconds</option>
            <option value="20000">20 seconds</option>
            <option value="25000">25 seconds</option>
            <option value="30000">30 seconds</option>
          </select>
        </form>
        <div className="slideshow">
          <div className="slideshow-slider" style={{ transform: `translate3d(${- index * 100}%,0,0)` }}>
          {
          userData.map((singleSlide) => {
          return (
            <div className='slide' key={singleSlide.id}>
              <img src={singleSlide.urls.small} alt={singleSlide.alt_description} />
              <div className="p-container">
                    <p className='joke'>{singleSlide.jokes.joke}</p>
              </div>
            </div>
          )
          })
          }
        </div>
        <div className="slideshowDots">
          {userData.map((_, idx) => (
            <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}
            ></div>
          ))}
        </div>
      </div>
      <Link to='/' className='go-back'>Return Home</Link>
    </section>
  )
}
export default Results;