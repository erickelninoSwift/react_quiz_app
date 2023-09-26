import React from "react";

export const NextButton = ({ dispatch }) => {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};
