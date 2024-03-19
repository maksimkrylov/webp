/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostItem from '../../UI/PostItem/PostItem';
import style from './Style/profilePage.module.css';
import { ModalProfile } from './ModalProfile';
import { logout } from '../SignPage/authSlice';
import pencil from "./assets/pencil.png"
import { RootState } from '@/redux/store';

function ProfilePage(): JSX.Element {
  const [btnIzbr, setbtnIzbr] = useState(true);

  const profiles = useSelector((store: RootState) => store.profiles.profiles);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditing = (value: boolean): void => {
    setIsEditing(value);
  };

  const { profileId } = useParams();
  const currentProfile = profileId && profiles.find((profile) => profile.id === +profileId);
  console.log(currentProfile);

  const user = useSelector((store: RootState) => store.auth.auth);
  const navigate = useNavigate();
  const allPosts = useSelector((store: RootState) => store.posts.posts);

  const izbranoeArray = allPosts.filter((el) =>
    el.Favorites.some((izbr) => +izbr.userId === +user!.id),
  );
  console.log(izbranoeArray);

  const userPosts = allPosts.filter((post) => profileId && post.userId === +profileId);

  return (
    <div className={style.main}>
      {currentProfile && (
        <div className={style.container}>
          <div className={style.user_page}>
            <div className={style.user_info}>
              <img className={style.user_backphoto} src={currentProfile.backgroundImg} alt="prof" />
              <div className={style.photo_info}>
                <div className={style.user_photo}>
                  <span className={style.circle_ava}>
                    <img src={currentProfile.img} alt="User Avatar" />
                  </span>
                </div>
                <div className={style.user_row}>
                  <div style={{ display: 'flex' }}>
                    <p className={style.user_name}>{currentProfile.name}</p>
                    <p className={style.user_email}>
                      {/* {currentProfile.email} */}
                      {user?.id === currentProfile.id && (
                        <span className={style.edit_icon} onClick={() => handleEditing(true)}>
                          ✏️
                        </span>
                      )}
                    </p>
                  </div>
                  <div className={style.user_count}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 className={style.user_posts_count}>{userPosts.length}</h3>
                      <p>Постов</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h3 className={style.user_followers_count}>0</h3>
                      <p>Подписчиков</p>
                    </div>
                    {user && user?.id !== currentProfile.id && (
                      <div className={style.contact_with_user}>
                        <div>
                          <button
                            type="button"
                            onClick={() => navigate(`/chat/${currentProfile.id}`)}
                          >
                            Чат
                          </button>
                        </div>
                        {/* <div>
                        <button type="button">Подписаться</button>
                      </div> */}
                      </div>
                    )}
                  </div>

                  <div className={style.user_details}>
                    <p>
                      <strong>Город:</strong> {currentProfile.city}
                    </p>
                    <p>
                      <strong>Контакт:</strong> {currentProfile.contact}
                    </p>
                    <p>
                      <strong>Дата рождения:</strong> {currentProfile.birthDate}
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            {btnIzbr ? (
              <button
                type="button"
                className={`${style.btnIz} ${style.btn}`}
                onClick={() => setbtnIzbr(!btnIzbr)}
              >
                Мои посты
              </button>
            ) : (
              <button
                type="button"
                className={`${style.btnIz} ${style.btn}`}
                onClick={() => setbtnIzbr(!btnIzbr)}
              >
                Избранное
              </button>
            )}
            {/* {userPosts.length > 0 && (
              <div className={style.users_public_h}>
                <h3>Публикации пользователя</h3>
              </div>
            )} */}
            <div className={style.user_posts}>
              {btnIzbr
                ? userPosts.map((post) => <PostItem key={post.id} post={post} />)
                : izbranoeArray.map((post) => <PostItem key={post.id} post={post} />)}
            </div>
          </div>
        </div>
      )}

      {currentProfile && isEditing && (
        <ModalProfile handleEditing={handleEditing} currentProfile={currentProfile} />
      )}
    </div>
  );
}

export default ProfilePage;
