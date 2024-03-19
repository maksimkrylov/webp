/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { editProfile } from './profileSlice';
import style from './Style/profilePage.module.css';
import type { User } from '../SignPage/types';
import { profileEdit } from '../WelcomPage/postsSlice';
import IMask from 'imask';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '@/redux/store';

export function ModalProfile({
  handleEditing,
  currentProfile,
}: {
  handleEditing: (value: boolean) => void;
  currentProfile: User;
}): JSX.Element {
  const dispatch = useAppDispatch();

  const [name, setName] = useState(currentProfile.name);
  const [email, setEmail] = useState(currentProfile.email);
  const [img, setImg] = useState<FileList | null>(null);
  const [city, setCity] = useState(currentProfile.city);
  const [contact, setContact] = useState(currentProfile.contact);
  const [birthDate, setBirthDate] = useState(currentProfile.birthDate);
  const [error, setError] = useState('');
  const loading = useSelector((store: RootState) => store.profiles.loading);

  const onHandleEditProfile = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const formData = new FormData();
    if (name === '') {
      setError('Поле имя не может быть пустым');
    } else if (email === '') {
      setError('Поле e-mail не может быть пустым');
    } else {
      formData.append('name', name);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('contact', contact);
      formData.append('birthDate', birthDate);
      if (img) {
        formData.append('img', img[0]);
      }
      dispatch(editProfile(formData))
        .then((data) => dispatch(profileEdit(data.payload)))
        .catch(console.log);
      handleEditing(false);
    }

    dispatch(editProfile(formData))
      .then((data: any) => dispatch(profileEdit(data.payload)))
      .catch(console.log);
    handleEditing(false);
  };

  const maskOptions = {
    phoneMask: '+{7}(000)000-00-00',
    bDMask: '00.00.0000',
  };

  return (
    <div className={style.modalBackground}>
      <div className={style.modalContent}>
        <h2>Редактировать профиль</h2>
        <form className={style.profile_edit_form} onSubmit={onHandleEditProfile}>
          <input
            defaultValue={currentProfile.name}
            type="text"
            placeholder="Новое имя"
            onChange={(e) => setName(e.target.value)}
          />
          {error === 'Поле имя не может быть пустым' && <p>{error}</p>}
          <input
            defaultValue={currentProfile.email}
            type="text"
            placeholder="Новый email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error === 'Поле e-mail не может быть пустым' && <p>{error}</p>}
          <div>
            <label htmlFor="avatar">
              Ваше фото
              <input
                // defaultValue={img || ''}
                defaultValue={img ? '' : undefined}
                style={{ marginLeft: '20px' }}
                id="avatar"
                type="file" 
                placeholder="Ваше фото"
                onChange={(e) => setImg(e.target.files)}
              />
            </label>
          </div>
          <input
            defaultValue={currentProfile.city}
            type="text"
            placeholder="Новый город"
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            defaultValue={currentProfile.contact}
            type="text"
            placeholder="Новый контакт"
            onChange={(e) => {
              setContact(e.target.value), IMask(e.target, maskOptions.phoneMask);
            }}
          />
          <input
            defaultValue={currentProfile.birthDate}
            type="text"
            onChange={(e) => {
              setBirthDate(e.target.value), IMask(e.target, maskOptions.bDMask);
            }}
            placeholder="Новая дата рождения"
          />
          <button type="button" className={style.btn} onClick={() => handleEditing(false)}>
            Закрыть
          </button>
          <button type="submit" className={style.btn}>
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
}
