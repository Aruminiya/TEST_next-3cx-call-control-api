'use client'

import { useState } from 'react';
import { sendAudioStream } from '../lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function SendAudioStream() {
  const mainState = useSelector((state: RootState) => state.main);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSendAudioStream = () => {
    if (!audioFile) throw new Error('No audio file selected');
    if (!mainState.dnnumber || !mainState.participantId) throw new Error('Dnnumber or participantId is not set');
    sendAudioStream(mainState.dnnumber, mainState.participantId, audioFile)
  };

  return (
    <>
      <h2>Send Audio Stream</h2>
      <p>發送音訊流</p>
      <label htmlFor="audioFile">PCB Audio File</label>
      <br />
      <input type="file" id="audioFile" placeholder="PCB Audio File" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
      <br />
      <button onClick={handleSendAudioStream}>Send Audio Stream</button>
    </>
  );
}

export default SendAudioStream;