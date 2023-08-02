import "./App.css";
import Header from "./Components/Header";
import Highscores from "./Components/Highscores";
import background from "./Assets/bg1.jpg";
import { useEffect, useState, useRef } from "react";
import db from "./firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

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
    const unsub = onSnapshot(collection(db, "Characters"), snapshot => {
      setChar(snapshot.docs.map(doc => ({ ...doc.data(), found: false })));
    });

    return unsub;
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

  const selected = e => {
    const newChar = [...char];
    const selectedChar = newChar.find(cname => cname.name === e.target.value);

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
                <option onClick={selected} value="Wally">
                  Wally
                </option>
                <option onClick={selected} value="Odlaw">
                  Odlaw
                </option>
                <option onClick={selected} value="Wizard">
                  Wizard
                </option>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
