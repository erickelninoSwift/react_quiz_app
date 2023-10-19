import React from "react";
import { useQuizContext } from "../Context/QuizContext";

export const Progress = () => {
  const { questions, index, answer, points } = useQuizContext();

  const maxTotalPoint = questions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.points;
  }, 0);
  return (
    <header className="progress">
      <progress
        max={questions.length}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong> / {maxTotalPoint}
      </p>
    </header>
  );
};
