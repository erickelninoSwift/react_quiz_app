import React from "react";
import { useQuizContext } from "../Context/QuizContext";

export const FinishedScreen = () => {
  const { questions, hightScore, points, dispatch } = useQuizContext();

  const maxTotalPoint = questions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.points;
  }, 0);

  const percentage = (points / maxTotalPoint) * 100;
  const empoji = percentage > 50 ? "🫶 ✅ 💪" : "😔 😥 😭 ";
  return (
    <>
      <p
        className="result"
        style={{ width: "500px", padding: "15px", fontSize: "16px" }}
      >
        {empoji} You scored <strong>{points}</strong> out of {maxTotalPoint}(
        {Math.ceil(percentage)})%
      </p>
      <p className="highscore">( Highscore : {hightScore} points)</p>
      <center>
        <button
          className="btn btn-ui"
          onClick={() => {
            return dispatch({ type: "restart" });
          }}
        >
          Restart
        </button>
      </center>
    </>
  );
};
