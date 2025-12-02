import { useState } from "react";

function Home() {
  const [message, setMessage] = useState("Fernando");

  function changeMessage() {
    setMessage("HI FERNANDO");
  }

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
      <button onClick={changeMessage}>CLICK FERNANDO</button>
    </div>
  );
}

export default Home;
