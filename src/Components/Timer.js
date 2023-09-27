import React, { useEffect, useState } from "react";

export const Timer = ({ seconds, dispatch }) => {
  const [currentTime, setTime] = useState("");
  const today = new Date();
  let x = 0;
  useEffect(() => {
    setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    console.log(seconds);
  }, []);

  return (
    <button disabled className="btn timer">
      {currentTime}
    </button>
  );
};
