import React from 'react';
import style from './style/404Page.module.css';
import img from './assets/404-page-not-found.png';

export const Page404 = () => {
  return (
    <main className={style.main_in_404}>
      <div className={style.container_for_404}>
        <div className={style.div_for_h1}></div>
        <div className={style.picture_in_404}>
          <img src={img} />
        </div>
      </div>
    </main>
  );
};
