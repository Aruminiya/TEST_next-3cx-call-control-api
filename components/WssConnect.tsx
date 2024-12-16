'use client'

import createWss from "../lib/wss";

function WssConnect() {
  const handleWssConnect = () => {
    const wss = createWss();
    console.log(wss);
  };

  return <button onClick={handleWssConnect}>Wss Connect</button>;
}

export default WssConnect;