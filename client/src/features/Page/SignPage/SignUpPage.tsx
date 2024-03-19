/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signUp } from './authSlice';
import style from './style/signPage.module.css';
import fon from './assets/fon.webp';
import { fielUsers } from '../ProfilePage/profileSlice';
import { RootState, useAppDispatch } from '@/redux/store';

function SignUpPage(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const [rpassword, setRpasssword] = useState('');

  const dispatch = useAppDispatch();
  const error = useSelector((store: RootState) => store.auth.error);
  const user = useSelector((store: RootState) => store.auth.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/news');
    }
  }, [user]);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.containerImg}>
          <img src={fon} alt="img" />
        </div>
        <div className={style.containerForm}>
          <form
            className={style.signUp}
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(signUp({ name, email, password, rpassword }))
                .then((res) => dispatch(fielUsers(res.payload)))
                .catch(console.log);
            }}
          >
            <h1>Регистрация PosTwitt</h1>
            <h4>Социальная сеть, для общения и обмена опытом среди разработчиков</h4>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Введите ваше имя"
              />
            </div>
            <div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Введите ваш email"
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => setPasssword(e.target.value)}
                type="password"
                placeholder="Придумайте пароль"
              />
            </div>
            <div>
              <input
                value={rpassword}
                onChange={(e) => setRpasssword(e.target.value)}
                type="password"
                placeholder="Повторите пароль"
              />
            </div>
            {error && <p className={`${style.subText} ${style.error}`}>{error}</p>}
            <button type="submit" className={style.btn}>
              Зарегистрироваться
            </button>
          </form>
          <p className={style.subText}>
            Уже eсть аккаунт? <a href="/sign-in">Войти</a>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
