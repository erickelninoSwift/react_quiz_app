import React from "react";
import { v4 as uuidv4 } from "uuid";

export const Options = ({ options }) => {
  return (
    <div className="options">
      {options.map((option) => {
        const id = uuidv4();
        return (
          <button key={id} className="btn btn-option">
            {option}
          </button>
        );
      })}
    </div>
  );
};
