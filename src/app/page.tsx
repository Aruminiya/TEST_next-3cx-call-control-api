'use client'

import MakeCall from "../../components/MakeCall";
import SendAudioStream from "../../components/SendAudioStream";
// import WssConnect from "../../components/WssConnect";

export default function Home() {

  return (
    <>
      <h1>Sip with 3cx</h1>
      <MakeCall />
      <hr />
      <SendAudioStream />
      {/* TODO: 連接 WebSocket */}
      {/* <WssConnect /> */}
    </>
  );
}