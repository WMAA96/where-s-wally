import db from "../firebase";
import {
  updateDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Highscores(props) {
  const { gameOver, timer, minute } = props;

  const [newHighscore, setNewHighscore] = useState(true);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (gameOver === true) {
      console.log(leaderboard);
      checkHighscore();
    }
  }, [gameOver]);

  useEffect(() => {
    const getLeaderboard = onSnapshot(
      query(collection(db, "Highscores"), orderBy("time")),
      snapshot => {
        setLeaderboard(
          snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    return getLeaderboard;
  }, []);

  const checkHighscore = () => {
    let userTime = minute + String(timer).padStart(4, "0");
    console.log(userTime);
    console.log(leaderboard);

    if (userTime <= leaderboard[4].time) {
      setNewHighscore(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let newTime = minute + String(timer).padStart(4, "0");

    const leaderboardDocRef = doc(db, "Highscores", leaderboard[4].id);
    console.log("H");
    console.log(leaderboardDocRef);
    const leaderboardData = {
      name: e.target.name.value,
      minute: parseInt(minute),
      seconds: parseFloat(timer),
      time: parseFloat(newTime),
    };

    updateDoc(leaderboardDocRef, leaderboardData);

    setNewHighscore(false);
  };

  function restartGame() {
    window.location.reload(false);
  }

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
                      <th>name</th>
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
