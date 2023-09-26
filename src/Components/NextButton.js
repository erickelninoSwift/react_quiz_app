import React from "react";

export const NextButton = ({ dispatch, index, numberofQuestions }) => {
  if (index < numberofQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
};
