'use server'

export const makeCall = async (dnnumber: string, destination: string) => {
  try {
    const response = await fetch(`${process.env.VITE_3CX_HOST}/callcontrol/${dnnumber}/makecall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_3CX_TOKEN}`
      },
      body: JSON.stringify({
        reason: 'Initiating call',
        destination: destination,
        timeout: 30
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Call initiated:', data);
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

    console.log('Sending audio stream:', audioBlob);
    const response = await fetch(`${process.env.VITE_3CX_HOST}/callcontrol/${dnnumber}/participants/${participantId}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/pcm',
        'Authorization': `Bearer ${process.env.VITE_3CX_TOKEN}`
      },
      body: audioBlob
    });

    if (response.ok) {
      console.log('Audio stream sent successfully');
    } else {
      console.error('Failed to send audio stream:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};