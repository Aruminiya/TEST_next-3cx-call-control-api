'use client'

import { useState } from 'react';
import { sendAudioStream } from '../lib/api';

type Payload = {
  dnnumber: string;
  destination: string;
}

function SendAudioStream() {
  const [payload, setPayload] = useState<Payload>({
    dnnumber: 'leo',
    destination: '',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleSendAudioStream = () => {
    if (!audioFile) {
      console.error('No audio file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const audioData = e.target?.result;
      console.log('Audio Data:', audioData);
    };
    reader.readAsArrayBuffer(audioFile);
    console.log(audioFile);

    sendAudioStream(payload.dnnumber, payload.destination, audioFile);
  };

  return (
    <>
      <h2>Send Audio Stream</h2>
      <p>發送音訊流</p>
      <label htmlFor="audioFile">PCB Audio File</label>
      <br />
      <input type="file" id="audioFile" placeholder="PCB Audio File" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
      <br />
      <input type="text" id="dnnumber" placeholder="Dnnumber" value={payload.dnnumber} onChange={(e) => setPayload({ ...payload, dnnumber: e.target.value })} />
      <input type="text" id="destination" placeholder="Destination" value={payload.destination} onChange={(e) => setPayload({ ...payload, destination: e.target.value })} />
      <button onClick={handleSendAudioStream}>Send Audio Stream</button>
    </>
  );
}

export default SendAudioStream;