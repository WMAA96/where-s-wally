function Highscores(props) {
  const { gameOver } = props;
  return (
    <div>
      {gameOver ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close">x</span>
            <h1>Leaderboard</h1>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Highscores;
