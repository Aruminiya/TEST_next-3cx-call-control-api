'use client'

import { UserAgent, Registerer } from 'sip.js';

async function makeSipCall() {
  // 創建 URI
  const uri = UserAgent.makeURI('sip:username@yourdomain.com');

  // 配置 UserAgent
  const userAgentOptions = {
    uri,
    transportOptions: {
      server: 'ws://localhost:3082', // 你的 WebSocket 伺服器地址
    },
    // authorizationUsername: 'username',
    // authorizationPassword: 'password',
  };

  const userAgent = new UserAgent(userAgentOptions);

  // 註冊 UserAgent
  const registerer = new Registerer(userAgent);
  console.log(registerer);

  // 發起呼叫
  // const target = 'sip:target@domain.com';
  // const inviter = new Web.Inviter(userAgent, target);

  // inviter.invite().then(() => {
  //   console.log('Call initiated');
  // }).catch((error) => {
  //   console.error('Call initiation failed:', error);
  // });
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