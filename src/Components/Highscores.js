import db from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function Highscores(props) {
  const { gameOver } = props;

  const [newHighscore, setNewHighscore] = useState(true);

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = onSnapshot(
      query(collection(db, "Highscores"), orderBy("time")),
      snapshot => {
        setLeaderboard(snapshot.docs.map(doc => doc.data()));
      }
    );
    return getLeaderboard;
  }, []);

  //console.log(leaderboard);

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
                        <tr>
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
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Highscores;
