import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import style from './statistik.module.css';

function StatistikItem(): JSX.Element {
  const users = useSelector((store: RootState) => store.profiles.profiles).length;
  const allPosts = useSelector((store: RootState) => store.posts.posts).length;

  const allPostsCountYest = useSelector((store: RootState) => store.posts.posts);
  const [count, setCount] = useState(0);

  // const currentDate = new Date(); // Получаем текущую дату и время
  // const postCreatedAt = new Date('2024-02-12T07:47:45.406Z'); // Преобразуем дату создания поста в объект Date

  // // Сравниваем дату создания поста с текущей датой
  // if (currentDate.toDateString() === postCreatedAt.toDateString()) {
  //   console.log('Пост был создан сегодня');
  // } else {
  //   console.log('Пост был создан в другой день');
  // }

  useEffect(() => {
    if (allPostsCountYest) {
      allPostsCountYest.forEach((post) => {
        const current = new Date();
        const postCreatedAt = new Date(post.createdAt);
        if (current.toDateString() === postCreatedAt.toDateString()) {
          setCount((prev) => prev + 1);
        }
      });
    }
  }, [allPostsCountYest]);

  return (
    <div className={style.container}>
      <div className={style.one}>
        <p className={style.count}>{users}</p>
        <p className={style.text}>Пользователей зарегестрировано</p>
      </div>
      <div className={style.two}>
        <p className={style.count}>{allPosts}</p>
        <p className={style.text}>Постов написано</p>
        {/* <p>Сообщений написано</p> */}
      </div>
      <div className={style.fre}>
        <p className={style.count}>{count}</p>
        <p className={style.text}>Написано сегодня постов</p>
      </div>
    </div>
  );
}

export default StatistikItem;
