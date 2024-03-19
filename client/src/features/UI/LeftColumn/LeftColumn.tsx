import React from 'react';
import { useSelector } from 'react-redux';
import style from './leftColumn.module.css';
import { RootState } from '@/redux/store';

function LeftColumn(): JSX.Element {
  const reating = useSelector((store: RootState) => store.reating.reating);
  
  return (
    <div className={style.LeftColumn}>
      <p className={style.title}>Актуальные темы</p>
      {reating.map((el) => (
        <a key={el.id} href={`/profiles/${el.userId}`} className={style.topicLink}>
          #{el.title}
        </a>
      ))}
    </div>
  );
}

export default LeftColumn;
