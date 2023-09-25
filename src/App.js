import { useEffect, useReducer } from "react";
import "./App.css";
import DateCounter from "./Components/DateCounter";
import Header from "./Components/Header";
import { Main } from "./Components/Main";
import { Loader } from "./Components/Loader";
import Error from "./Components/Error";
import { StartSceen } from "./Components/StartSceen";
import { Question } from "./Components/Question";

const initialState = {
  questions: [],
  isLoading: false,
  status: "Loading",
  index: 0,
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
};

function App() {
  const [{ questions, isLoading, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

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

  return (
    <div className="app">
      <Header />
      {status === "Loading" && <Loader />}
      {status === "Error" && <Error />}
      {status === "Ready" && (
        <StartSceen
          numbQuestions={totalQuestion(questions)}
          dispatch={dispatch}
        />
      )}
      {status === "active" && <Question allQuestion={questions[index]} />}
    </div>
  );
}

export default App;
