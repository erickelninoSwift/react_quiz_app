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
import { Progress } from "./Components/Progress";
import { FinishedScreen } from "./Components/FinishedScreen";
import { Footer } from "./Components/Footer";

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
  if (action.type === "DataReceived") {
    return { ...currentState, questions: action.payload, status: "Ready" };
  }
  if (action.type === "Failure") {
    return { ...currentState, status: "Error" };
  }
  if (action.type === "start") {
    return {
      ...currentState,
      status: "active",
      secondsRemaing: currentState.questions.length * SECS_PRE_QUESTION,
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
    };
  }
  if (action.type === "nextQuestion") {
    return {
      ...currentState,
      index: currentState.index + 1,
      answer: null,
    };
  }
  if (action.type === "done") {
    return {
      ...currentState,
      status: "finished",
      hightScore: currentState.points,
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
    };
  }
  if (action.type === "tick") {
    return {
      ...currentState,
      secondsRemaing: currentState.secondsRemaing - 1,
      status:
        currentState.secondsRemaing === 0 ? "finished" : currentState.status,
    };
  }
};

function App() {
  const [
    { questions, secondsRemaing, hightScore, status, index, answer, points },
    dispatch,
  ] = useReducer(reducer, initialState);

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

  const maxTotalPoint = questions.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.points;
  }, 0);

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
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxTotalPoint}
            dispatch={dispatch}
            hightScore={hightScore}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index + 1}
              numberQuestions={totalQuestion(questions)}
              currentPoint={points}
              maxpossiblePoints={maxTotalPoint}
              answer={answer}
              dispatch={dispatch}
            />

            <Question
              allQuestion={questions[index]}
              dispatch={dispatch}
              answer={answer}
              myPoints={points}
            />
            <Footer>
              <Timer seconds={secondsRemaing} dispatch={dispatch} />

              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  index={index}
                  numberofQuestions={totalQuestion(questions)}
                />
              )}
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
