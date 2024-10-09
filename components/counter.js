import React, { useState, useEffect } from 'react';

export default function Counter({ initialValue, finalValue, intervalDuration }) {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < finalValue) {
        setCount((prevCount) => prevCount + 1);
      }
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [count, finalValue, intervalDuration]);

  return <span className="odometer">{count}</span>;
};

