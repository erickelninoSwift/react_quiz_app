import React from "react";
import { Options } from "./Options";
export const Question = ({ allQuestion, dispatch, answer }) => {
  const { question, points, options, correctOption } = allQuestion;

  console.log(allQuestion);
  console.log(`My answer is : ${allQuestion.options[answer]}`);
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
