import React, { useState, useEffect } from "react";

function calcCounter(counter) {
  if (counter > 59)
    return `${Math.floor(counter / 60)} min: ${counter % 60} sec`;
  else return ` ${counter} sec`;
}

const Countdown = () => {
  const [counter, setCounter] = useState(10 * 60);

  useEffect(() => {
    let timeout;
    if (counter > 0) timeout = setTimeout(() => setCounter(counter - 1), 1000);
    return () => clearTimeout(timeout);
  }, [counter]);

  return (
    <div className="App">
      {counter > 0 ? (
        <div>Time before code expiry: {calcCounter(counter)}</div>
      ) : (
        <div style={{ color: "red" }}>Password reset code has expired</div>
      )}
    </div>
  );
};

export default Countdown;
