import { useState } from 'react';
import './App.css';
import Status from './components/Status';
import Card from './components/Card';

const imagePath = 'Cards/';

const fillImages = () => {
    let images = Array(20).fill(null);
    let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    let suits = ['h', 's'];
    let index = 0;
    for (let value = 0; value < values.length; value++) {
        for (let suit = 0; suit < suits.length; suit++) {
            images[index] = "card" + values[value] + suits[suit] + ".jpg";
            index++;
        }
    }
    return images;
}

const shuffleImages = (images) => {
    for (let i = 0; i < images.length; i++) {
        let rnd = Math.floor(Math.random() * images.length);
        [images[i], images[rnd]] = [images[rnd], images[i]];
    }

    /* I chose to keep the shuffleImages function and have it return the updated images. Previously, I was running into an error
    where the images would be undefined when trying to initialize them (on line 54) because the shuffleImages function
    didn't have a return statement. */
    return images;
}

/* The fillAndShuffle function will call fillImages and shuffleImages (and return the result). Giving this function to useState (on line 54) 
will improve efficiency because fillAndShuffle will only need to be called two times at most for each individual game. */
const fillAndShuffle = () => {
    let filledImages = fillImages();
    let shuffledImages = shuffleImages(filledImages);
    return shuffledImages;
}

const isMatch = (firstPick, secondPick, images) => {
    if (images[firstPick].substr(4, 1) == images[secondPick].substr(4, 1))
        return true;
    else
        return false;
}

function App() {
    // Set all of the state variables, and their mutator functions.
    const [matches, setMatches] = useState(0);
    const [tries, setTries] = useState(0);
    const [picks, setPicks] = useState({ first: -1, second: -1 });
    const [images, setImages] = useState(fillAndShuffle);

    const renderCard = (i) => {
        const image = (images[i] == null) ? 'none' :
            (picks.first == i || picks.second == i) ?
                'url(' + imagePath + images[i] + ')' :
                'url(' + imagePath + 'black_back.jpg)';

        const enabled = (images[i] != null &&
            (i != picks.first && i != picks.second) &&
            (picks.first == -1 || picks.second == -1) &&
            (matches < 10)) ? true : false;

        const eventHandler = (enabled) ? handleClick : () => { };
        const cursor = (enabled) ? "pointer" : "none";
        const style = {
            backgroundImage: image,
            cursor: cursor
        }
        // Return the JSX for a card, this time using the Card functional component.
        return (
            <Card
                index={i}
                eventHandler={eventHandler}
                style={style}
            />
        )
    }

    const handleClick = (event) => {
        // Create a local copy of picks so that state isn't mutated directly. A similar process occurs with images on line 95.
        let localPicks = { ...picks };
        const index = parseInt(event.target.id);

        if (localPicks.first == -1) {
            localPicks.first = index;
            setPicks(localPicks);
        }
        else {
            localPicks.second = index;
            setPicks(localPicks);
            let localImages = [...images];
            setTimeout(checkCards, 1000, localPicks.first, localPicks.second, localImages, tries, matches);
        }

    }

    const checkCards = (firstPick, secondPick, images, tries, matches) => {
        tries++;
        if (isMatch(firstPick, secondPick, images)) {
            matches++;
            images[firstPick] = null;
            images[secondPick] = null;
        }
        /* Since the setPicks mutator function accepts an object as its parameter, declare the reset values for
        the picks as an object called "newPicks". */
        const newPicks = { first: -1, second: -1 };

        // Call the mutator functions to change state.
        setImages(images);
        setPicks(newPicks);
        setMatches(matches);
        setTries(tries);
    }

    let status = (matches < 10) ?
        'Matches: ' + matches + " Tries: " + tries :
        "Congratulations!  You found all 10 matches in " + tries + " tries!";

    return (
        <div className="container" id="board">
            <Status status={status} />
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(0)}
                {renderCard(1)}
                {renderCard(2)}
                {renderCard(3)}
                {renderCard(4)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(5)}
                {renderCard(6)}
                {renderCard(7)}
                {renderCard(8)}
                {renderCard(9)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(10)}
                {renderCard(11)}
                {renderCard(12)}
                {renderCard(13)}
                {renderCard(14)}
                <div className="col-1"></div>
            </div>
            <div className="row">
                <div className="col-sm-1"></div>
                {renderCard(15)}
                {renderCard(16)}
                {renderCard(17)}
                {renderCard(18)}
                {renderCard(19)}
                <div className="col-1"></div>
            </div>
        </div>
    )
}

export default App;