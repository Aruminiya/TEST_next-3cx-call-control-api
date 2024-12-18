'use client'

import { UserAgent, Registerer, Inviter, URI } from 'sip.js';

async function makeSipCall() {
  // 定義 WebSocket 連接選項
  const transportOptions = {
    server: 'ws://localhost:3082',
  };

  // 創建 URI
  const uri = UserAgent.makeURI('sip:victor@127.0.0.1:5483');

  // 定義 User Agent 配置
  const userAgentOptions = {
    uri,
    // authorizationUsername: '3005',
    // authorizationPassword: '1234',
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
      // make3CXCall();
    }).catch((error) => {
      console.error('Failed to register SIP User Agent', error);
    });
  }).catch((error) => {
    console.error('Failed to start SIP User Agent', error);
  });

  // 發起 3CX 呼叫
  function make3CXCall() {
    fetch(`http://localhost:3030/api/callcontrol/victor/makecall`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
  // 使用從 /callcontrol 獲得的正確目標URI
  const target = new URI('sip', '28', '127.0.0.1:5483');
  const inviter = new Inviter(userAgent, target);

    // 獲取音頻流
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      console.log('獲取音頻流 stream', stream);
      inviter.invite({
        requestDelegate: {
          onAccept: (response) => {
            console.log('SIP call accepted', response);
          },
          onReject: (response) => {
            console.error('SIP call rejected', response);
          }
        },
        sessionDescriptionHandlerOptions: {
          constraints: { audio: true },
          stream
        }
      }).then(() => {
        console.log('SIP call initiated');
      }).catch((error) => {
        console.error('Failed to initiate SIP call', error);
      });
    })
    .catch((error) => {
      console.error('Error accessing media devices', error);
    });

    // inviter.invite().then(() => {
    //   console.log('SIP call initiated');
    // }).catch((error) => {
    //   console.error('Failed to initiate SIP call', error);
    // });
  }
}

function MakeCallWithSip() {

  const handleMakeCall = async () => {
    // 開始流程
    makeSipCall();
  };

  return (
    <>
      <h2>Make Call With Sip</h2>
      <p>撥打電話搭配 Sip 傳送語音</p>
      <button onClick={handleMakeCall}>Make Call SIP</button>
    </>
  );
}

export default MakeCallWithSip;