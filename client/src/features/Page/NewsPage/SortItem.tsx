/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { loadPosts, loadSortPosts } from '../WelcomPage/postsSlice';
import style from './style/sortitem.module.css';
import { useAppDispatch } from '@/redux/store';

export const SortItem = (): JSX.Element => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (text) {
      dispatch(loadSortPosts(text)).catch(console.log);
    } else {
      dispatch(loadPosts()).catch(console.log);
    }
  }, [text]);
  return (
    <form action="">
      <div className={style.sortItem}>
        <input
          className={style.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Поиск"
        />
      </div>
    </form>
  );
};
