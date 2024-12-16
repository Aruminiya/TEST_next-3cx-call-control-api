'use client'

import { makeCall, sendAudioStream } from "../../lib/api";
import { useRef, useState } from "react";
export default function Home() {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleMakeCall = async () => {
    const response = await makeCall('leo', '28');
    setParticipantId(response.result.id);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=pcm' });
      console.log('MediaRecorder created', mediaRecorderRef.current);

      mediaRecorderRef.current.ondataavailable = async (event) => {
        if (event.data.size > 0 && participantId) {
          await sendAudioStream('28', participantId, event.data);
        }
      };

      mediaRecorderRef.current.start(1000); // 每秒發送一次音頻數據
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  return (
    <>
      <h1>Sip with 3cx</h1>
      <button onClick={handleMakeCall}>Make Call</button>
      {participantId && <p>Participant ID: {participantId}</p>}
      <button onClick={startRecording}>Start Recording</button>
    </>
  );
}
