'use client'

import { useSelector } from "react-redux";
import { makeCall } from "../lib/api";
import { RootState } from "../store";


function MakeCall() {
  const mainState = useSelector((state: RootState) => state.main);

  const handleMakeCall = async () => {
    if (!mainState.dnnumber || !mainState.id)  throw new Error('Dnnumber or id is not set');
    const response = await makeCall(mainState.dnnumber, mainState.id);
    console.log(response);
  };

  return (
    <>
      <h2>Make Call</h2>
      <p>撥打電話</p>
      <button onClick={handleMakeCall}>Make Call</button>
    </>
  );
}

export default MakeCall;