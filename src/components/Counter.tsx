import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "../app/features/counter/counterSlice";
import { RootState } from "../app/store/store";

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState<number>(0);

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>

        <input
          type="text"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />

        <div>
          <button onClick={() => dispatch(incrementByAmount(addValue))}>
            Increment By Amount
          </button>
          <button onClick={resetAll}>Reset</button>
        </div>
      </div>
    </section>
  );
};

export default Counter;
