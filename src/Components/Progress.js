import React from "react";

export const Progress = ({
  index,
  numberQuestions,
  currentPoint,
  maxpossiblePoints,
  answer,
  dispatch,
}) => {
  if (index === numberQuestions) return dispatch({ type: "done" });
  return (
    <header className="progress">
      <progress max={numberQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index}</strong> / {numberQuestions}
      </p>
      <p>
        <strong>{currentPoint}</strong> / {maxpossiblePoints}
      </p>
    </header>
  );
};
