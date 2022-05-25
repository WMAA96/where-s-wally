import "./App.css";
import Header from "./Components/Header";
import background from "./Assets/bg1.jpeg";
import { useEffect, useState, useRef } from "react";
import db from "./firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

function App() {
  const ref = useRef(null);
  const [userclick, setUserclick] = useState(false);

  const [x, setX] = useState();

  const [y, setY] = useState();

  const [char, setChar] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "Characters"), snapshot => {
      setChar(snapshot.docs.map(doc => doc.data()));
    });
    return unsub;
  }, []);

  useEffect(() => {
    console.log(x / ref.current.offsetWidth);
    console.log(y / ref.current.offsetHeight);
  }, [x]);

  const clicked = e => {
    setX(e.pageX);
    setY(e.pageY);

    setUserclick(!userclick);
  };

  const selected = e => {
    console.log(e.target.value);
    setUserclick(!userclick);
  };

  return (
    <div className="App">
      <Header />
      <div className="Main">
        <div className="imageContainer">
          <img
            ref={ref}
            className="wally"
            src={background}
            alt="sdf"
            onClick={clicked}
          />
          {userclick ? (
            <div style={{ left: x, top: y }} className="dropdown">
              <option onClick={selected} value="wally">
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
