import db from "../firebase";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Highscores(props) {
  const { gameOver, timer, minute } = props;

  const [newHighscore, setNewHighscore] = useState(false);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (gameOver === true) {
      checkHighscore();
    }
  }, [gameOver]);

  useEffect(() => {
    const unsubLeaderboard = onSnapshot(
      query(collection(db, "Highscores"), orderBy("time")),
      snapshot => {
        setLeaderboard(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    return () => unsubLeaderboard();
  }, []);

  const checkHighscore = () => {
    let userTime = minute + String(timer).padStart(4, "0");

    if (userTime <= leaderboard[[leaderboard.length - 1]].time) {
      setNewHighscore(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let newTime = minute + String(timer).padStart(4, "0");

    const leaderboardDocRef = doc(
      db,
      "Highscores",
      leaderboard[[leaderboard.length - 1]].id
    );

    const leaderboardData = {
      name: e.target.name.value,
      minute: parseInt(minute),
      seconds: parseFloat(timer),
      time: parseFloat(newTime),
    };

    updateDoc(leaderboardDocRef, leaderboardData);

    setNewHighscore(false);
  };

  const restartGame = () => {
    window.location.reload(false);
  };

  return (
    <div>
      {gameOver ? (
        <div className="modal">
          <div className="modal-content">
            {!newHighscore ? (
              <div className="hiscoresContent">
                <span className="close" onClick={restartGame}>
                  x
                </span>
                <h1 className="hiscoresHeader">Hiscores</h1>

                <table>
                  <tbody>
                    <tr>
                      <th>Name</th>
                      <th>Time</th>
                    </tr>
                    {leaderboard.map(score => {
                      return (
                        <tr key={score.id}>
                          <td>{score.name} </td>
                          <td>
                            {score.minute}m{score.seconds}s
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className="sqButton" onClick={restartGame}>
                  Restart
                </button>
              </div>
            ) : (
              // what returns if user breaks the highscore
              <div className="hiscoresHeader">
                <span className="close" onClick={restartGame}>
                  x
                </span>
                <h1 className="hiscoresHeader">
                  Congratulations, your score belongs in our highscores!
                </h1>
                <form onSubmit={handleSubmit}>
                  <label>
                    <input
                      className="nameInput"
                      placeholder="Name"
                      type="text"
                      name="name"
                    />
                  </label>
                  <input className="sqButton" type="submit" value="Submit" />
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Highscores;
