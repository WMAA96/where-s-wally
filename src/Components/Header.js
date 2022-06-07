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
            <li key={char.name}>
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

        <h1 className="timer">
          {timer < 10 ? 0 : null}
          {timer}s
        </h1>
      </div>
    </div>
  );
}

export default Header;
