import React from 'react';
import style from './style/welcomepage.module.css';
import LeftColumn from '../../UI/LeftColumn/LeftColumn';
import HeaderWelcomePage from '../../UI/HeaderWelcomePage/HeaderWelcomePage';
import StatistikItem from '../../UI/StatisticItem/StatistikItem';
import Slider from '../../UI/Slider/Slider';

import img1 from '../../UI/Slider/assets/images1.jpg';
import img2 from '../../UI/Slider/assets/images2.jpg';
import img3 from '../../UI/Slider/assets/images3.jpg';
import img4 from '../../UI/Slider/assets/images4.jpg';
import img5 from '../../UI/Slider/assets/images5.jpg';
import img7 from '../../UI/Slider/assets/images7.jpg';
import img8 from '../../UI/Slider/assets/images8.jpg';
import img9 from '../../UI/Slider/assets/images9.jpg';
import type { Post } from './types';

function WelcomPage(): JSX.Element {
  const slice: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'Программирование',
      content:
        'Когда ты пишешь код и он работает сразу с первого раза: это чувство, которое сложно описать словами. 😎',
      img: null,
      likes: 4,
      createdAt: '2024-02-12T07:47:45.406Z',
      User: {
        id: 1,
        password: '$2b$10$0Buz6NO/rXKcN43B82F3Sul/4j2DjaWifELNt.mlAQ5GaGoTRn9O2',
        isAdmin: false,
        img: img1,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 2,
      userId: 2,
      title: 'Вопрос о программировании',
      content: 'Кто что нибудь знает о ReactJS? Очень срочно!!',
      img: null,
      likes: 7,
      createdAt: '2024-02-13T10:22:30.812Z',
      User: {
        id: 2,
        password: '$2b$10$E6ezuZnc2XR92qjXs2E4RO85gUf.Gw9mb4vyT7JGpXouoDRVBwH0m',
        isAdmin: false,
        img: img2,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 3,
      userId: 3,
      title: 'Новый день',
      content: 'Доброе утро! Новый день, новые возможности!',
      img: null,
      likes: 12,
      createdAt: '2024-02-14T06:30:00.000Z',
      User: {
        id: 3,
        password: '$2b$10$qR5NfhzZm1oXROIfWdLpIuF/rEYtxZzIr7n6oA2Z8F4T3xTq1HLbW',
        isAdmin: false,
        img: img3,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 4,
      userId: 1,
      title: 'Обеденный перерыв',
      content:
        "Как программисту объяснить, что такое 'завтра' и 'послезавтра'? Завтра — это когда код уже написан, а 'послезавтра' — когда все баги исправлены. ",
      img: null,
      likes: 5,
      createdAt: '2024-02-14T12:00:00.000Z',

      User: {
        id: 1,
        password: '$2b$10$0Buz6NO/rXKcN43B82F3Sul/4j2DjaWifELNt.mlAQ5GaGoTRn9O2',
        isAdmin: false,
        img: img4,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 6,
      userId: 3,
      title: 'Прогулка в парке',
      content: 'Сегодня замечательная погода, идеально для прогулки в парке.',
      img: null,
      likes: 8,
      createdAt: '2024-02-14T14:30:00.000Z',

      User: {
        id: 3,
        password: '$2b$10$qR5NfhzZm1oXROIfWdLpIuF/rEYtxZzIr7n6oA2Z8F4T3xTq1HLbW',
        isAdmin: false,
        img: img5,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 7,
      userId: 2,
      title: 'Баги в коде',
      content:
        'Баги в коде — это как загадки, которые тебе нужно разгадать. Иногда это сложно, но всегда увлекательно!',
      img: null,
      likes: 6,
      createdAt: '2024-02-14T18:00:00.000Z',
      User: {
        id: 2,
        password: '$2b$10$E6ezuZnc2XR92qjXs2E4RO85gUf.Gw9mb4vyT7JGpXouoDRVBwH0m',
        isAdmin: false,
        img: img4,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 8,
      userId: 1,
      title: 'Интересный фильм',
      content: 'Посмотрел сегодня очень интересный фильм. Рекомендую всем!',
      img: null,
      likes: 10,
      createdAt: '2024-02-14T20:45:00.000Z',
      User: {
        id: 1,
        password: '$2b$10$0Buz6NO/rXKcN43B82F3Sul/4j2DjaWifELNt.mlAQ5GaGoTRn9O2',
        isAdmin: false,
        img: img7,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 9,
      userId: 3,
      title: 'Мотивация сегодня',
      content:
        'Кодить — это как строить пазл: иногда ты тратишь много времени, чтобы найти нужные кусочки, но когда они встают на свои места, это зрелище!',
      img: null,
      likes: 3,
      createdAt: '2024-02-14T22:00:00.000Z',
      User: {
        id: 3,
        password: '$2b$10$qR5NfhzZm1oXROIfWdLpIuF/rEYtxZzIr7n6oA2Z8F4T3xTq1HLbW',
        isAdmin: false,
        img: img8,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
    {
      id: 15,
      userId: 2,
      title: 'Новый проект',
      content: 'Работаю над новым проектом. Уже очень интересно получается!',
      img: null,
      likes: 2,
      createdAt: '2024-02-15T09:00:00.000Z',
      User: {
        id: 2,
        password: '$2b$10$E6ezuZnc2XR92qjXs2E4RO85gUf.Gw9mb4vyT7JGpXouoDRVBwH0m',
        isAdmin: false,
        img: img9,
        city: '',
        contact: '',
        birthDate: '',
        name: '',
        email: '',
      },
      Comments: [],
      Favorites: [],
      PostLikes: [],
    },
  ];

  return (
    <main className={style.main}>
      <HeaderWelcomePage />
      <div className={style.wrapper}>
        <StatistikItem />
        <div className={style.container}>
          <h1>Последние посты</h1>
        </div>
        <div className={style.containerFlexRow}>
          <Slider posts={slice} />
          <LeftColumn />
        </div>
        <div className={style.footer}>
          <h1>
            Зарегистрируйтесь и <br />
            узнайте обо всем первым
          </h1>
          <div>
            <a href="/sign-up" className={style.btn}>
              Зарегистрироваться
            </a>
            <a href="/sign-in" className={style.btn}>
              Войти
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
export default WelcomPage;
