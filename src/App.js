import "./App.css";
import Header from "./Components/Header";
import Highscores from "./Components/Highscores";
import background from "./Assets/bg1.jpg";
import { useEffect, useState, useRef } from "react";
import db from "./firebase";
import { collection, doc, onSnapshot, getDocs } from "firebase/firestore";

function App() {
  const ref = useRef(null);
  const [userclick, setUserclick] = useState(false);

  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  });

  const [char, setChar] = useState([]);

  const [timer, setTimer] = useState(58);
  const [minute, setMinute] = useState(1);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    console.log(coords.y * 100 + " y");
    console.log(coords.x * 100 + " x");
  }, [coords]);

  // sets the timer
  useEffect(() => {
    const interval = setInterval(() => {
      gameOver
        ? clearInterval(interval)
        : setTimer(timer => (parseFloat(timer) + 0.1).toFixed(1));
    }, 100);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (timer % 60 === 0 && timer !== 0) {
      setTimer(0);
      setMinute(minute => minute + 1);
    }
  }, [timer]);

  //grabs character locations and highscores
  useEffect(() => {
    const charactersData = getDocs(collection(db, "Characters"));

    charactersData.then(snapshot => {
      const characters = snapshot.docs.map(doc => ({
        ...doc.data(),
        found: false,
      }));
      setChar(characters);
    });
  }, []);

  const clicked = e => {
    const containerRect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - containerRect.left;
    const offsetY = e.clientY - containerRect.top;
    const x = offsetX / containerRect.width;
    const y = offsetY / containerRect.height;

    setCoords({ x, y });

    setUserclick(!userclick);
  };

  const selected = character => {
    console.log(char);
    console.log(character);
    const newChar = [...char];
    const selectedChar = newChar.find(cname => cname.name === character);

    if (
      coords.x * 100 <= selectedChar.X + 1.5 &&
      coords.x * 100 >= selectedChar.X - 1.5 &&
      coords.y * 100 <= selectedChar.Y + 3 &&
      coords.y * 100 >= selectedChar.Y - 3
    ) {
      console.log(minute + "m" + (timer < 10 ? "0" + timer : timer) + "s");
      selectedChar.found = true;

      setChar(newChar);
      if (newChar.filter(x => x.found === false).length === 0) {
        setGameOver(true);
      }
    }

    setUserclick(!userclick);
  };

  return (
    <div className="App">
      <Header char={char} timer={timer} minute={minute} />
      <div className="gg">
        <div className="Main">
          <Highscores gameOver={gameOver} timer={timer} minute={minute} />
          <div className="imageContainer" ref={ref}>
            <img
              className="wally"
              src={background}
              alt="sdf"
              onClick={clicked}
            />
            {userclick ? (
              <div
                style={{
                  left: coords.x * ref.current.offsetWidth,
                  top: coords.y * ref.current.offsetHeight,
                }}
                className="dropdown"
              >
                {char.map(char => (
                  <div className={`charOption ${char.found}`} key={char.name}>
                    <img
                      onClick={() => selected(char.name)}
                      src={require(`./Assets/${char.name}.jpg`)}
                      className="dropdownCharImg"
                      alt={char.name}
                    />
                    <option
                      onClick={() => selected(char.name)}
                      value={char.name}
                    >
                      {char.name}
                    </option>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
