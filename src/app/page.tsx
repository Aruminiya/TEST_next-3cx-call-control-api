'use client'

import { Provider } from 'react-redux';
import store from '../../store/index';
import MakeCall from "../../components/MakeCall";
import SendAudioStream from "../../components/SendAudioStream";
// import WssConnect from "../../components/WssConnect";
import MainInputData from "../../components/MainInputData";
export default function App() {
  return (
    <Provider store={store}>
      <MainInputData />
      <MakeCall />
      <hr />
      <SendAudioStream />
      {/* TODO: 連接 WebSocket */}
      {/* <WssConnect /> */}
    </Provider>
  );
}