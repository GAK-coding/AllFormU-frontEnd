import React from 'react';
import { ChatBox } from './styles';
import { Skeleton } from 'antd';
import { Chat } from '../../../typings/resForm';

export default function GPTModalChat({ myReq, gptRes }: Chat) {
  return (
    <div>
      <ChatBox type={'user'}>
        <div>
          <img src={'/images/userProfile.png'} alt={'유저 프로필 사진'} />
          <span>오현</span>
        </div>
        <span>{myReq}</span>
      </ChatBox>
      <ChatBox type={'gpt'}>
        <div>
          <img src={'/images/chatgpt.png'} alt={'chat gpt 사진'} />
          <span>GPT</span>
        </div>
        <span>{gptRes ? gptRes : <Skeleton loading={true} active />}</span>
      </ChatBox>
    </div>
  );
}