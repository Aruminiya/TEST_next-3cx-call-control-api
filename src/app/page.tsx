'use client'

import { Provider } from 'react-redux';
import store from '../../store/index';
import MakeCall from "../../components/MakeCall";
import SendAudioStream from "../../components/SendAudioStream";
// import WssConnect from "../../components/WssConnect";
import MainInputData from "../../components/MainInputData";
import MakeCallWithSip from '../../components/MakeCallWithSip';
import MakeCallWithDeviceId from '../../components/MakeCallWithDeviceId';
import token_3cx from '../../utils/getToken';
export default function App() {
  token_3cx();
  return (
    <Provider store={store}>
      <MainInputData />
      <MakeCall />
      <hr />
      <MakeCallWithDeviceId />
      <hr />
      <MakeCallWithSip />
      <hr />
      <SendAudioStream />
      {/* TODO: 連接 WebSocket */}
      {/* <WssConnect /> */}
    </Provider>
  );
}