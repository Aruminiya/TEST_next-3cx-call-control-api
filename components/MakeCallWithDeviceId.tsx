'use client'

import { useDispatch, useSelector } from "react-redux";
import { makeCall } from "../lib/api";
import { RootState } from "../store";
import { mainActions } from "../store/slices/mainSlice";


function MakeCall() {
  const mainState = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();

  const handleMakeCallWithDeviceId = async () => {
    if (!mainState.dnnumber || !mainState.id)  throw new Error('Dnnumber or id is not set');
    const response = await makeCall(mainState.dnnumber, mainState.id);
    dispatch(mainActions.setParticipantId(response?.result?.id));
    console.log('撥打電話回應', response);
    console.log('mainState', mainState);
  };

  return (
    <>
      <h2>Make Call With DeviceId</h2>
      <p>撥打電話搭配 deviceId</p>
      <button onClick={handleMakeCallWithDeviceId}>Make Call</button>
    </>
  );
}

export default MakeCall;