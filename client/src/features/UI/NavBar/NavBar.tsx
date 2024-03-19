/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/function-component-definition */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../Page/SignPage/authSlice';

import style from './navbar.module.css';
import './themeSwitcher.scss';
import { useColorTheme } from '../UseColorTheme/UseColorTheme';
import { RootState, useAppDispatch } from '@/redux/store';

const NavBar = (): JSX.Element => {
  const user = useSelector((store: RootState) => store.auth.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { colorTheme, toggleColorTheme } = useColorTheme();

  const onChangeTheme = (): void => {
    toggleColorTheme();
  };

  return (
    <>
      <div className={style.header}>
        <div className={style.container}>
          <ul className={style.navigation}>
            {user ? (
              <>
                <div className={style.rightBox}>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.link} ${window.location.pathname === '/news' ? style.active : ''}`}
                      to="/news"
                    >
                      Лента
                    </NavLink>
                  </li>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.link} ${window.location.pathname === `/profiles/${user?.id}` ? style.active : ''}`}
                      to={`/profiles/${user?.id}`}
                    >
                      Моя страница
                    </NavLink>
                  </li>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.link} ${window.location.pathname === `/chat` ? style.active : ''}`}
                      to="/chat"
                    >
                      Чат
                    </NavLink>
                  </li>
                </div>

                <li className={style.itemTheme}>
                  <input
                    type="checkbox"
                    name="theme_switch"
                    className="theme_switch__input"
                    id="themeSwitch"
                    onChange={onChangeTheme}
                  />
                  <label htmlFor="themeSwitch" className="theme_switch__label">
                    <span></span>
                  </label>
                </li>

                <li
                  onClick={() => {
                    dispatch(logout()).catch(console.log);
                    navigate('/');
                  }}
                  className={style.item}
                >
                  <NavLink className={style.link} to="/logout">
                    Выход
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <div className={style.leftBox}>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.btn} ${window.location.pathname === '/sign-in' ? style.active : ''}`}
                      to="/sign-in"
                    >
                      Вход
                    </NavLink>
                  </li>
                  <li className={style.item}>
                    <NavLink
                      className={`${style.btn}${window.location.pathname === '/sign-up' ? style.active : ''}`}
                      to="/sign-up"
                    >
                      Регистрация
                    </NavLink>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
