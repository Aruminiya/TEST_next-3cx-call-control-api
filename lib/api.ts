'use server'

import token_3cx from '../utils/getToken';

export const makeCall = async (dnnumber: string, destination: string) => {
  try {
    const token = await token_3cx();
    const response = await fetch(`${process.env.NEXT_3CX_HOST}/callcontrol/${dnnumber}/makecall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        reason: 'Initiating call',
        destination: destination,
        timeout: 30
      })
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Call initiated:', data);
      // data.result.id 就是 participantId
      return data;
    } else {
      console.error('Failed to initiate call:', response.statusText);
      throw new Error('Failed to initiate call', { cause: response.statusText });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const sendAudioStream = async (dnnumber: string, participantId: string, audioBlob: Blob) => {
  try {
    const token = await token_3cx();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/octet-stream");
    myHeaders.append("Authorization", `Bearer ${token}`);

    console.log('Sending audio stream:', audioBlob);
    const response = await fetch(`${process.env.NEXT_3CX_HOST}/callcontrol/${dnnumber}/participants/${participantId}/stream`, {
      method: "POST",
      headers: myHeaders,
      body: audioBlob,
      redirect: "follow"
    });

    if (response.ok) {
      console.log('Audio stream sent successfully');
    } else {
      console.error('Failed to send audio stream:', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


export const makeCallWithDeviceId = async (dnnumber: string, destination: string, deviceId: string) => {
  try {
    const token = await token_3cx();
    const response = await fetch(`${process.env.NEXT_3CX_HOST}/callcontrol/${dnnumber}/devices/${deviceId}/makecall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        reason: 'Initiating call',
        destination: destination,
        timeout: 30
      })
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Call initiated:', data);
      // data.result.id 就是 participantId
      return data;
    } else {
      console.error('Failed to initiate call:', response.statusText);
      throw new Error('Failed to initiate call', { cause: response.statusText });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};