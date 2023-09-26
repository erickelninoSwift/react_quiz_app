import React from "react";
import { Options } from "./Options";
export const Question = ({ allQuestion, dispatch, answer, myPoints }) => {
  const { question, points, options, correctOption } = allQuestion;

  console.log(`total points : ${myPoints}`);

  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        currentDispach={dispatch}
        answer={answer}
        correct={correctOption}
      />
    </div>
  );
};
