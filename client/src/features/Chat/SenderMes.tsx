import React from 'react';
import {type Message } from './types';
import { type User } from '../Page/SignPage/types';

function SenderMes({message, user}: {message: Message, user: User}):JSX.Element {
  
  return (
    <li className="slds-chat-listitem slds-chat-listitem_outbound">
      <div className="slds-chat-message-outbound">
        <div className="slds-chat-message__body-outbound">
          <div className="slds-chat-message__text slds-chat-message__text_outbound">
            <span>{message.content}</span>
          </div>
          <div className="slds-chat-message__meta" >
            {user?.name} • {`${message.createdAt.slice(0, 10)} ${message.createdAt.slice(11, 19)}`}
          </div>
        </div>
      </div>
    </li>
  );
}

export default SenderMes;