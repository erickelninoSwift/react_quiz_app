import React from "react";
import { useQuizContext } from "../Context/QuizContext";

export const NextButton = () => {
  const { questions, index, dispatch } = useQuizContext();
  if (index < questions.length - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index >= questions.length - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "done" })}>
        Done
      </button>
    );
};
