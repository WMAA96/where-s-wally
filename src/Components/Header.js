import tick from "../Assets/tick.jpg";

function Header(props) {
  const { char, timer, minute } = props;

  return (
    <div className="header">
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
          {/* pad the timer with 0's if necessary*/}
          {timer < 10 ? 0 : null}
          {timer === 0 ? ".0" : null}
          {timer}s{" "}
        </h1>
      </div>
    </div>
  );
}

export default Header;
