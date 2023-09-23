import { useReducer, useState } from "react";

const reducer = (currentState, action) => {
  switch (action.type) {
    case "dec":
      return { ...currentState, count: currentState.count - 1 };
    case "inc":
      return { ...currentState, count: currentState.count + 1 };
    case "setCount":
      return { count: action.payload, step: 1 };
    default:
      console.log("big man thing");
  }
};

function DateCounter() {
  // const [count, setCount] = useState(0);

  const initialState = { count: 0, step: 1 };
  const [state1, dispatch] = useReducer(reducer, initialState);

  const [count, step] = state1;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    return dispatch({ type: "dec" });
  };

  const inc = function () {
    console.log(count);
    return dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "setCount", payload: 0 });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
