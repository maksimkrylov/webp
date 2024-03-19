/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import './style/chat.css';

import { Link, NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import socket from './socket';
import SenderMes from './SenderMes';
import ReceiverMes from './ReceiverMes';
import './style/panel.css';
import { addDialog, addMessage, loadChats } from './chatSlice';
import { type User } from '../Page/SignPage/types';
import { Dialog, type Message } from './types';
import { RootState, useAppDispatch } from '@/redux/store';

function ChatPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const chats = useSelector((store: RootState) => store.chats.dialogs);
  const user = useSelector((store: RootState) => store.auth.auth);
  const users = useSelector((store: RootState) => store.profiles.profiles).filter(
    (prof: User) => prof.id !== user?.id,
  );
  const { receiverId } = useParams();
  const [activeId, setActiveId] = useState<number | null>(receiverId ? +receiverId : null);
  const [receiver, setReceiver] = useState(user);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('');

  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    dispatch(loadChats()).catch(console.log);
  }, []);

  useEffect(() => {
    if (containerRef.current && containerRef.current.scrollHeight) {
      containerRef?.current?.scrollTo(0, containerRef.current?.scrollHeight);
    }
  }, [chats, receiver]);

  useEffect(() => {
    if (user) {
      socket.connect();
      socket.on('connect', () => {
        socket.emit('reg', user?.id);
        setIsConnected(true);
      });

      socket.on('add dialog', (dialog) => {
        dispatch(addDialog(dialog));
      });

      socket.on('chat message', (msg: { user: User; newMessage: Message }) => {
        console.log(msg.newMessage);
        dispatch(addMessage(msg.newMessage));
      });

      socket.on('disconnect', () => setIsConnected(false));

      return () => {
        socket.disconnect();
        socket.off('connect', () => setIsConnected(true));
        socket.off('disconnect', () => setIsConnected(false));
      };
    }
  }, [user]);

  useEffect(() => {
    setReceiver(users.find((el:User) => receiverId && el.id === +receiverId));
  }, [users, activeId]);
  return (
    <>
      <div className="containber-all">
        <div className="container-nav-left">
          <nav className="chat-navigation">
            <ul className="chat-navigation-list">
              {chats.map((dialog:Dialog) => {
                let man = dialog.User1 || dialog.User2;
                if (!man) {
                  if (dialog.userId1 === user?.id)
                    man = users.find((el:User) => el.id === dialog.userId2);
                  if (dialog.userId2 === user?.id)
                    man = users.find((el: User) => el.id === dialog.userId1);
                }
                return (
                  <div
                    key={dialog.id}
                    onClick={() => {
                      if (man) {
                        setActiveId(man.id);
                        setReceiver(man);
                      }
                    }}
                    className={`chat-navigation-item ${man?.id === activeId ? 'active' : ''}`}
                  >
                    {man && <NavLink to={`/chat/${man?.id}`}>{man?.name}</NavLink>}
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="container-chat">
          <div className="topPanel">
            <Link to={`/profiles/${receiver?.id}`} className="link-style">
              {receiver?.img && <img className="receiverAva" src={receiver?.img} alt="" />}
              {receiver?.name}
            </Link>
          </div>
          <section role="log" className="slds-chat">
            <ul ref={containerRef} className="slds-chat-list">
              {receiver &&
                chats.map(
                  (dialog: Dialog) =>
                    (dialog.userId1 === activeId || dialog.userId2 === activeId) &&
                    dialog.Messages?.map((mes) =>
                      mes.content !== '' && mes.senderId === user?.id ? (
                        <SenderMes user={user} message={mes} />
                      ) : (
                        <ReceiverMes receiver={receiver} message={mes} />
                      ),
                    ),
                )}
            </ul>
            {receiver && (
              <div className=" footer">
                <input
                  className="input"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                />
                <button
                  className="btn"
                  onClick={(e) => {
                    e.preventDefault();
                    if (receiver === undefined) return;
                    socket.emit('chat message', message, user, activeId);
                    setMessage('');
                  }}
                  type="submit"
                >
                  Опубликовать
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
