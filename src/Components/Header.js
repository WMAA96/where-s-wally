import Wally from "../Assets/Wally.jpg";
import odlaw from "../Assets/Odlaw.jpg";
import Wizard from "../Assets/Wizard.jpg";
import tick from "../Assets/tick.jpg";

function Header(props) {
  const { char, timer, minute } = props;

  return (
    <div className="Header">
      <ul>
        {char.map(char => {
          return (
            <li>
              {char.found ? (
                <img className="tick" src={tick} alt="sdf" />
              ) : null}

              <img
                className="characterList"
                src={require(`../Assets/${char.name}.jpg`)}
                alt={char.name}
              />
            </li>
          );
        })}
      </ul>
      <div className="aaa">
        <h1>Wheres Wally?</h1>
      </div>

      <div className="timer">
        <h1 className="timer">Timer: {minute}m </h1>
        {
          // I want to pad a 0 here later}
        }
        <h1 className="timer">{timer}s</h1>
      </div>
    </div>
  );
}

export default Header;
