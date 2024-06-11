// Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '@/stores/reducer/counterSlice';

const Counter = () => {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(decrement())}
          aria-label="Decrement value"
        >
          -
        </button>
        <span>{count}</span>
        <button
          onClick={() => dispatch(increment())}
          aria-label="Increment value"
        >
          +
        </button>
      </div>
      <div>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
};

export default Counter;