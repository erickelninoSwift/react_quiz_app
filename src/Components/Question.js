import React from "react";
import { Options } from "./Options";
export const Question = ({ allQuestion }) => {
  const { question, points, options, correctOption } = allQuestion;

  console.log(allQuestion);
  return (
    <div>
      <h4>{question}</h4>
      <Options options={options} />
    </div>
  );
};
