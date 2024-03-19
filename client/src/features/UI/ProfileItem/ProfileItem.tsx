import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import style from './ProfileItem.module.css';

function ProfileItem(): JSX.Element {
  const user = useSelector((store: RootState) => store.auth.auth);

  return (
    <div>
      <div className={style.user_info}>
        <div className={style.user_photo}>
          <span className={style.circle_ava}>
            <img src={user!.img} alt="User Avatar" />
          </span>
        </div>
        <div className={style.user_row}>
          <div style={{ display: 'flex' }}>
            <p className={style.user_name}>{user!.name}</p>
          </div>

          <div className={style.user_details}>
            <p>
              <strong>Город:</strong> {user!.city}
            </p>
            <p>
              <strong>Контакт:</strong> {user!.contact}
            </p>
            <p>
              <strong>Дата рождения:</strong> {user!.birthDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileItem;
