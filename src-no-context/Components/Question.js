import React from "react";
import { Options } from "./Options";
export const Question = ({ allQuestion, dispatch, answer, myPoints }) => {
  const { question, options, correctOption } = allQuestion;

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
