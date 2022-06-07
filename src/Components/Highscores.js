import db from "../firebase";
import {
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

  const [newHighscore, setNewHighscore] = useState(false);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (gameOver === true) {
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

    if (userTime <= leaderboard[4].time) {
      setNewHighscore(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    let newTime = minute + String(timer).padStart(4, "0");

    setDoc(doc(db, "Highscores", "AA"), {
      name: e.target.name.value,
      minute: parseInt(minute),
      seconds: parseFloat(timer),
      time: parseFloat(newTime),
    });

    setNewHighscore(false);
  };

  return (
    <div>
      {gameOver ? (
        <div className="modal">
          <div className="modal-content">
            {!newHighscore ? (
              <div>
                <span className="close">x</span>
                <h1>Leaderboard</h1>
                <table>
                  <tbody>
                    <tr>
                      <th>name</th>
                      <th>Time</th>
                    </tr>
                    {leaderboard.map(score => {
                      return (
                        <tr key={score.id}>
                          <td>{score.name}</td>
                          <td>
                            {score.minute}m{score.seconds}s
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              // what returns if user breaks the highscore
              <div>
                <span className="close">x</span>
                <h1>Congratulations, your score belongs in our highscores!</h1>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input type="text" name="name" />
                  </label>
                  <input type="submit" value="Submit" />
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
