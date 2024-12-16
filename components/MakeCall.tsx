'use client'

import { makeCall } from "../lib/api";
import { useState } from "react";

type Payload = {
  dnnumber: string;
  destination: string;
}

function MakeCall() {
  const [payload, setPayload] = useState<Payload>({
    dnnumber: 'leo',
    destination: '28',
  });

  const [participantId, setParticipantId] = useState<string | null>(null);

  const handleMakeCall = async () => {
    const response = await makeCall(payload.dnnumber, payload.destination);
    console.log(response);
    setParticipantId(response.result.id);
  };

  return (
    <>
      <h2>Make Call</h2>
      <p>撥打電話</p>
      <input 
        type="text" 
        placeholder="Dnnumber" 
        value={payload.dnnumber} 
        onChange={(e) => setPayload({ ...payload, dnnumber: e.target.value })} 
      />
      <input 
        type="text" 
        placeholder="Destination" 
        value={payload.destination} 
        onChange={(e) => setPayload({ ...payload, destination: e.target.value })} 
      />
      <button onClick={handleMakeCall}>Make Call</button>
      {participantId && <p>Participant ID: {participantId}</p>}
    </>
  );
}

export default MakeCall;