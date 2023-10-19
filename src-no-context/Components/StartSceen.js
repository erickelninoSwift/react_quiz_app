import React from "react";

export const StartSceen = ({ numbQuestions: number, dispatch }) => {
  const startQuiz = () => {
    return dispatch({ type: "start" });
  };
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{number} Questions to Test your React Mastery </h3>
      <button className="btn" onClick={startQuiz}>
        Let's start
      </button>
    </div>
  );
};
