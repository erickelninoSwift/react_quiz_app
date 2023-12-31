import React, { useEffect, useState } from "react";
import { useQuizContext } from "../Context/QuizContext";
export const Timer = () => {
  const { secondsRemaing, dispatch } = useQuizContext();

  const mins = Math.floor(secondsRemaing / 60);
  const sec = secondsRemaing % 60;
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
