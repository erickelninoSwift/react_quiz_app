import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [currentTime, setTime] = useState("");
  const today = new Date();
  let x = 0;
  useEffect(() => {
    setInterval(() => {
      return "";
    }, 1000);
  }, []);
  return (
    <button disabled className="btn timer">
      {currentTime}
    </button>
  );
};
