import "./App.css";
import Header from "./Components/Header";
import background from "./Assets/bg1.jpeg";
import { useState } from "react";

function App() {
  const [userclick, setUserclick] = useState(false);

  const [x, setX] = useState();

  const [y, setY] = useState();

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
        <div>
          <img className="wally" src={background} alt="sdf" onClick={clicked} />
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
