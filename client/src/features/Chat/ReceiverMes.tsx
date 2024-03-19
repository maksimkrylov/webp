import React from 'react';
import type { User } from '../Page/SignPage/types';
import type { Message } from './types';

function ReceiverMes({ receiver, message }: { receiver: User; message: Message }): JSX.Element {
  return (
    <li className="slds-chat-listitem slds-chat-listitem_inbound">
      <div className="slds-chat-message-inbound">
        <span aria-hidden="true" className="slds-avatar slds-avatar_circle slds-chat-avatar">
          <abbr
            className="slds-avatar__initials slds-avatar__initials_inverse"
            title="Andy Martinez"
          >
            {receiver.name.slice(0, 1).toUpperCase()}
          </abbr>
        </span>
        <div className="slds-chat-message__body-inbound">
          <div className="slds-chat-message__text slds-chat-message__text_inbound">
            <span>{message && message.content}</span>
          </div>
          <div className="slds-chat-message__meta" >
            {receiver?.name}•
            {`${message.createdAt.slice(0, 10)} ${message.createdAt.slice(11, 19)}`}
          </div>
        </div>
      </div>
    </li>
  );
}

export default ReceiverMes;