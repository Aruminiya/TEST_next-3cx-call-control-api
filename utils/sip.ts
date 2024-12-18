'use server'

import { UserAgent, Registerer, Inviter, URI } from 'sip.js';

export default async function makeSipCall() {
  // 定義 WebSocket 連接選項
  const transportOptions = {
    server: 'wss://bonuc.sbc.telesale.org:7443/ws',
  };

  // 創建 URI
  const uri = UserAgent.makeURI('sip:3005@bonuc.sbc.telesale.org');

  // 定義 User Agent 配置
  const userAgentOptions = {
    uri,
    authorizationUsername: '3005',
    authorizationPassword: '1234',
    transportOptions,
  };

  // 創建 SIP User Agent
  const userAgent = new UserAgent(userAgentOptions);

  // 創建 Registerer 以註冊 User Agent
  const registerer = new Registerer(userAgent);

  // 開始 User Agent 並註冊
  userAgent.start().then(() => {
    registerer.register().then(() => {
      console.log('SIP User Agent registered');
      // 在這裡可以發起 3CX 呼叫
      console.log('發起 3CX 呼叫');
      make3CXCall();
    }).catch((error) => {
      console.error('Failed to register SIP User Agent', error);
    });
  }).catch((error) => {
    console.error('Failed to start SIP User Agent', error);
  });

  // 發起 3CX 呼叫
  function make3CXCall() {
    fetch(`${process.env.VITE_3CX_HOST}/callcontrol/leo/makecall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_3CX_TOKEN}`, //token
      },
      body: JSON.stringify({
        reason: 'Test Call',
        destination: '28',
        timeout: 30,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('3CX call initiated successfully');
        initiateSIPCall();
      } else {
        console.error('Failed to initiate 3CX call');
      }
    })
    .catch(error => {
      console.error('Error initiating 3CX call', error);
    });
  }

  // 使用 SIP.js 發起語音通話
  function initiateSIPCall() {
    const target = new URI('sip', 'destination', 'bonuc.sbc.telesale.org');
    const inviter = new Inviter(userAgent, target);

    inviter.invite().then(() => {
      console.log('SIP call initiated');
    }).catch((error) => {
      console.error('Failed to initiate SIP call', error);
    });
  }
}