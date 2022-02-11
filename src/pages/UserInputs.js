// Modules
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
// Assets
import arrowPic from "../styles/assets/arrowPicEdited.png";
// UserInputs.js
const UserInputs = ({ propTerm, propLimit, propSubmit }) => {
    const [userLimitChoice] = useState(10);
    const [userChoice, setUserChoice] = useState("placeholder");
    const [jokeNumberOne, setJokeNumberOne] = useState("");
    const [jokeNumberTwo, setJokeNumberTwo] = useState("");
    const [jokeNumberThree, setJokeNumberThree] = useState("");
    const navigate = useNavigate();
    // when the form submits, get the values of each of the user's inputs and set them into useStates.
    const handleSubmit = (event) => {
        event.preventDefault();
        const jokeData = [{ joke: jokeNumberOne }, { joke: jokeNumberTwo }, { joke: jokeNumberThree }];
        const filteredJokeData = jokeData.filter((jokeFilter) => {
            return jokeFilter.joke !== ""
        })
        propTerm(userChoice);
        propLimit(userLimitChoice - filteredJokeData.length);
        propSubmit(true);
        // using navigate here by the recommendation of Adrian and Joey to route the page to /results while pushing the data from the UserInputs component to the Results component. 
        navigate('/results',
            { 
                state: filteredJokeData
            }
        )
    }
    return (
        <div className='wrapper'>
            <div>
                <form className="form"
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <label htmlFor="select">Select Your Theme</label>
                    <p>Please Pick A Photo Category</p>
                    <select className="dropDown"
                        id="category"
                        name="category"
                        onChange={(e) => setUserChoice(e.target.value)}
                        value={userChoice}
                    >
                        <option value="placeholder" disabled>Choose Your Category</option>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                        <option value="babies">Babies</option>
                        <option value="baby animals">Baby Animals</option>
                        <option value="bunnies">Bunnies</option>
                    </select>
                    <div className='customDadDiv'>
                        <div className="stackBox">
                            <label htmlFor="jokeNumberOne">Please Add A Dad Joke</label>
                            <p>Enter 1 Custom Dad Joke</p>
                            <input
                                type="text"
                                value={jokeNumberOne}
                                placeholder="Dad Joke Required"
                                onChange={e => setJokeNumberOne(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                value={jokeNumberTwo}
                                placeholder="Enter your dad joke"
                                onChange={e => setJokeNumberTwo(e.target.value)}
                            />
                            <input
                                type="text"
                                value={jokeNumberThree}
                                placeholder="Enter your dad joke"
                                onChange={e => setJokeNumberThree(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='arrowDiv'>
                        <img src={arrowPic} alt="Click to proceed!" className='arrowImage'></img>
                        <button type='submit' className='enterButton'>Enter</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UserInputs;