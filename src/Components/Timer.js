import React from "react";

export const Timer = () => {
  const today = new Date();
  return (
    <button disabled className="btn timer">
      {today.getMinutes() +
        ":" +
        today.getSeconds() +
        ":" +
        today.getMilliseconds()}
    </button>
  );
};
