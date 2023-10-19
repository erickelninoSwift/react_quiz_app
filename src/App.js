import { useEffect, useReducer } from "react";
import "./App.css";

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
import { useQuizContext } from "./Context/QuizContext";

function App() {
  const { status, answer } = useQuizContext();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && <StartSceen />}
        {status === "finished" && <FinishedScreen />}
        {status === "active" && (
          <>
            <Progress />

            <Question />
            <Footer>
              <Timer />

              {answer !== null && <NextButton />}
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
