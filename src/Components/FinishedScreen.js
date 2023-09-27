import React from "react";

export const FinishedScreen = ({ points, maxPoints, dispatch, hightScore }) => {
  const percentage = (points / maxPoints) * 100;
  const empoji = percentage > 50 ? "🫶 ✅ 💪" : "😔 😥 😭 ";
  return (
    <>
      <p
        className="result"
        style={{ width: "500px", padding: "15px", fontSize: "16px" }}
      >
        {empoji} You scored <strong>{points}</strong> out of {maxPoints}(
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
