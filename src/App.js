import "./App.css";
import Header from "./Components/Header";
import background from "./Assets/bg1.jpeg";
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

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Characters"), snapshot => {
      setChar(snapshot.docs.map(doc => ({ ...doc.data(), found: false })));
    });

    return unsub;
  }, []);

  useEffect(() => {
    // * coords by 100, if its within 1 range e.g wally at 0.43 so 43 if its within 42-44 then works
    //console.log(coords.y * 100);
    //console.log(coords);
    console.log(char);
  }, [char]);

  const clicked = e => {
    setCoords({
      x: e.pageX / ref.current.offsetWidth,
      y: e.pageY / ref.current.offsetHeight,
    });
    setUserclick(!userclick);
  };

  const selected = e => {
    const selectedChar = char.find(cname => cname.name === e.target.value);
    console.log(char);
    if (
      coords.x * 100 <= selectedChar.X + 1.5 &&
      coords.x * 100 >= selectedChar.X - 1.5 &&
      coords.y * 100 <= selectedChar.Y + 3 &&
      coords.y * 100 >= selectedChar.Y - 3
    ) {
      console.log("FMM2");
      selectedChar.found = true;
    }

    setUserclick(!userclick);
  };

  return (
    <div className="App">
      <Header />
      <div className="Main">
        <div className="imageContainer" ref={ref}>
          <img className="wally" src={background} alt="sdf" onClick={clicked} />
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
  );
}

export default App;
