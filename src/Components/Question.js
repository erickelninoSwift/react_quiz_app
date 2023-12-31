import React from "react";
import { Options } from "./Options";
import { useQuizContext } from "../Context/QuizContext";
export const Question = () => {
  const { questions, index, answer, dispatch } = useQuizContext();
  const { question, options, correctOption } = questions[index];

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
