import React from "react";
import { v4 as uuidv4 } from "uuid";

export const Options = ({ correct, options, currentDispach, answer }) => {
  const hasAnswered = answer === null;
  return (
    <div className="options">
      {options.map((option, index) => {
        const id = uuidv4();
        return (
          <button
            disabled={answer !== null}
            key={id}
            className={`btn btn-option ${
              hasAnswered ? "" : index === answer ? "answer" : ""
            } ${hasAnswered ? "" : index === correct ? "correct" : "wrong"}`}
            onClick={() =>
              currentDispach({ type: "newAnswer", payload: index })
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
