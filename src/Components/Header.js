import Wally from "../Assets/Wally.jpg";
import odlaw from "../Assets/Odlaw.jpg";
import Wizard from "../Assets/Wizard.jpg";
import tick from "../Assets/tick.jpg";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function Header(props) {
  const { char, timer, minute } = props;

  return (
    <Navbar>
      <div className="charList">
        {char.map(char => {
          return (
            <div className="char" key={char.name}>
              {char.found ? (
                <img className="tick" src={tick} alt="sdf" />
              ) : null}

              <img
                className="characterImg"
                src={require(`../Assets/${char.name}.jpg`)}
                alt={char.name}
              />
            </div>
          );
        })}
      </div>
      <div className="title">
        <h1>Wheres Wally?</h1>
      </div>

      <div className="timer">
        <h1 className="timer">
          <span className="timerText">Timer: </span> {minute}m{" "}
          {timer < 10 ? 0 : null}
          {timer}s{" "}
        </h1>
      </div>
    </Navbar>
  );
}

export default Header;
