import React from "react";
import { useQuizContext } from "../Context/QuizContext";

export const StartSceen = () => {
  const { dispatch, questions } = useQuizContext();
  const startQuiz = () => {
    return dispatch({ type: "start" });
  };
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} Questions to Test your React Mastery </h3>
      <button className="btn" onClick={startQuiz}>
        Let's start
      </button>
    </div>
  );
};
