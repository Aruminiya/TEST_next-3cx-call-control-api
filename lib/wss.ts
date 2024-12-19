'use server'

function createWss() {
  // 建立 WebSocket 連接
  const socket = new WebSocket(`${process.env.NEXT_3CX_WS_URL}/callcontrol/ws`);

  socket.onopen = (res) => {
    console.log('WebSocket connection established', res);
    socket.send(JSON.stringify({
      type: 'authorization',
      token: `Bearer ${process.env.NEXT_3CX_TOKEN}`
    }));
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
    // 在這裡處理來自伺服器的消息
    // 例如，將消息存儲在某個地方，或通過 API 傳遞給客戶端
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  // 返回 WebSocket 對象
  return socket;
}

export default createWss;