'use client'

import { makeCall } from "../../lib/api";
import { useState } from "react";
export default function Home() {
  const [participantId, setParticipantId] = useState<string | null>(null);

  const handleMakeCall = async () => {
    const response = await makeCall('leo', '28');
    setParticipantId(response.result.id);
  };
  

  return (
    <>
      <h1>Sip with 3cx</h1>
      <button onClick={handleMakeCall}>Make Call</button>
      {participantId && <p>Participant ID: {participantId}</p>}
    </>
  );
}
