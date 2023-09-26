import { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./Components/DateCounter";
import Header from "./Components/Header";
import { Main } from "./Components/Main";
import { Loader } from "./Components/Loader";
import Error from "./Components/Error";
import { StartSceen } from "./Components/StartSceen";
import { Question } from "./Components/Question";
import { NextButton } from "./Components/NextButton";
import { Timer } from "./Components/Timer";

const initialState = {
  questions: [],
  isLoading: false,
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
};
const reducer = (currentState, action) => {
  if (action.type === "DataReceived") {
    return { ...currentState, questions: action.payload, status: "Ready" };
  }
  if (action.type === "Failure") {
    return { ...currentState, status: "Error" };
  }
  if (action.type === "start") {
    return { ...currentState, status: "active" };
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
    };
  }
  if (action.type === "nextQuestion") {
    return {
      ...currentState,
      index:
        currentState.index < currentState.questions.length - 1
          ? currentState.index + 1
          : 0,
      answer: null,
    };
  }
};

function App() {
  const [{ questions, isLoading, status, index, answer, points }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        initialState.isLoading = true;
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();

        dispatch({ type: "DataReceived", payload: data });
      } catch (err) {
        console.error("There was an error while fetching data" + err);
        dispatch({ type: "Failure" });
      } finally {
        initialState.isLoading = false;
      }
    };

    fetchData();
  }, []);

  const totalQuestion = (questions) => {
    return questions.length;
  };

  const today = new Date();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartSceen
            numbQuestions={totalQuestion(questions)}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Question
              allQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
              myPoints={points}
            />
            <Timer />
            {answer !== null && (
              <NextButton dispatch={dispatch} answer={answer} />
            )}
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
