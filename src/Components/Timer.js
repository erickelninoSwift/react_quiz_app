import React, { useEffect, useState } from "react";

export const Timer = ({ seconds, dispatch }) => {
  const mins = Math.floor(seconds / 60);
  const sec = seconds % 60;
  useEffect(() => {
    const id = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);
    return () => {
      return clearInterval(id);
    };
  }, [dispatch]);

  return (
    <button disabled className="btn timer">
      {mins < 10 && "0"}
      {mins}:{sec < 10 && "0"}
      {sec}
    </button>
  );
};
