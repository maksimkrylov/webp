/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './addForm.module.css';
import { AddPosts } from '../../Page/WelcomPage/postsSlice';
import { RootState, useAppDispatch } from '@/redux/store';

const AddForm = (): JSX.Element => {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  // файл
  const [image, setImg] = useState<FileList | null>(null);
  const [error, setError] = useState('');

  const user = useSelector((store: RootState) => store.auth.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (title === '') {
      setError('Тема не может быть пустой');
    } else if (text === '') {
      setError('Пост не может быть пустым');
    } else {
      const formData = new FormData();
      formData.append('image', (image && image[0]) || '');
      formData.append('title', title);
      formData.append('content', text);
      user &&
        dispatch(AddPosts(formData))
          .then(() => {
            setText('');
            setTitle('');
          })
          .catch(console.log);
    }
  };

  return (
    <div className={style.postForm}>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          className={style.textarea}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Тема твитта, она попадет в рейтинги!"
        />
        {error === 'Тема не может быть пустой' && <p className={style.eror}>{error}</p>}
        <textarea
          className={style.textarea_text}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Что нового, ${user?.name}?`}
        />
        {error === 'Пост не может быть пустым' && <p>{error}</p>}
        <div className={style.footer}>
          <input type="file" className={style.input} onChange={(e) => setImg(e.target.files)} />
          <button type="submit" className={style.btn} onClick={() => setError('')}>
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
