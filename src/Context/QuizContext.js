import React from "react";

import { createContext, useEffect, useContext, useReducer } from "react";

const SECS_PRE_QUESTION = 20;

const initialState = {
  questions: [],
  isLoading: false,
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  hightScore: 0,
  secondsRemaing: null,
};
const reducer = (currentState, action) => {
  if (action.type === "loading") {
    return { ...currentState, isLoading: true };
  }
  if (action.type === "DataReceived") {
    return {
      ...currentState,
      questions: action.payload,
      status: "Ready",
      isLoading: false,
    };
  }
  if (action.type === "Failure") {
    return { ...currentState, status: "Error", isLoading: false };
  }
  if (action.type === "start") {
    return {
      ...currentState,
      status: "active",
      secondsRemaing: currentState.questions.length * SECS_PRE_QUESTION,
      isLoading: false,
    };
  }
  if (action.type === "newAnswer") {
    const currentQuestion = currentState.questions.at(currentState.index);

    return {
      ...currentState,
      answer: action.payload,
      points:
        currentQuestion.correctOption === action.payload
          ? currentState.points + currentQuestion.points
          : currentState.points,
      isLoading: false,
    };
  }
  if (action.type === "nextQuestion") {
    return {
      ...currentState,
      index: currentState.index + 1,
      answer: null,
      isLoading: false,
    };
  }
  if (action.type === "done") {
    return {
      ...currentState,
      status: "finished",
      hightScore: currentState.points,
      isLoading: false,
    };
  }
  if (action.type === "restart") {
    return {
      ...currentState,
      questions: currentState.questions,
      answer: null,
      index: 0,
      points: 0,
      status: "Ready",
      hightScore: 0,
      secondsRemaing: 10,
      isLoading: false,
    };
  }
  if (action.type === "tick") {
    return {
      ...currentState,
      secondsRemaing: currentState.secondsRemaing - 1,
      status:
        currentState.secondsRemaing === 0 ? "finished" : currentState.status,
      isLoading: false,
    };
  }
};

const QuizCurrentContext = createContext();

const QuizContext = ({ children }) => {
  const [
    { questions, secondsRemaing, hightScore, status, index, answer, points },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "loading" });
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "DataReceived", payload: data });
      } catch (err) {
        console.error("There was an error while fetching data" + err);
        dispatch({ type: "Failure" });
      }
    };

    fetchData();
  }, []);
  return (
    <QuizCurrentContext.Provider
      value={{
        questions,
        secondsRemaing,
        hightScore,
        status,
        index,
        answer,
        points,
        dispatch,
        initialState,
      }}
    >
      {children}
    </QuizCurrentContext.Provider>
  );
};

const useQuizContext = () => {
  const context = useContext(QuizCurrentContext);

  return context;
};

export { QuizContext, useQuizContext };
