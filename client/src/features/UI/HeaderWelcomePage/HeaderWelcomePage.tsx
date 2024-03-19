import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './headerWelcomePage.module.css';
// import fon from './assets/group.jpg';
import svgDolf from './assets/1141426.svg';
import group from './assets/IMG.jpg';

function HeaderWelcomePage(): JSX.Element {
  return (
    <div className={style.containerHeader}>
      <div className={style.boxTitle}>
        <div className={style.boxTitle}>
          <img src={svgDolf} alt="dolpf" className={style.svg} />
          <h1>
            Ныряй как дельфин на{' '}
            <NavLink to="/news" className={style.btnDemo}>
              PosTwitt
            </NavLink>{' '}
            и общайся <br /> на языке кода!
          </h1>
          <div className={style.boxFlex}>
            <a href="/sign-up" className={style.btn}>
              Зарегистрироваться
            </a>
            <a href="/sign-in" className={style.btn}>
              Войти
            </a>
          </div>
        </div>
      </div>
      <div className={style.boxImg}>
        <img src={group} alt="" />
      </div>
    </div>
  );
}

export default HeaderWelcomePage;
