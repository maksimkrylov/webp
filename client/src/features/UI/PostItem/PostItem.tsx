/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import type { Post } from '../../Page/WelcomPage/types';
import { type RootState, useAppDispatch } from '@/redux/store';
import {
  AddComment,
  DelComment,
  DelPost,
  DisFavoritesPost,
  DisLikePost,
  FavoritesPost,
  LikePost,
} from '../../Page/WelcomPage/postsSlice';
import commentImg from './img/comment.png';
import favorite from './img/избранное.png';
import disfavorite from './img/Vector.png';
import emptyLike from './img/empty.svg';
import like from './img/full.svg';
import style from './postitem.module.css';

function PostItem({ post }: { post: Post }): JSX.Element {
  const dispatch = useAppDispatch();

  // состояния на коменты
  const [stateCom, setComState] = useState(false);
  const [text, setText] = useState('');

  const user = useSelector((store: RootState) => store.auth.auth);

  // проверка лайкал ли юзер этот пост
  const findUserInLikePost = user && Boolean(post.PostLikes.find((el) => el.userId === user.id));

  const findUserInFavoritesPost =
    user && Boolean(post.Favorites.find((el) => +el.userId === user.id));
  // лайки

  const formatDateTime = (createdate: string): string => {
    const date = new Date(createdate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <>
      <div className={style.containerPost}>
        <div className={style.containerPostOne}>
          <div className={style.containerPostPhoto}>
            <NavLink to={`/profiles/${post.User.id}`}>
              <img className={style.Img} src={post.User.img} />
            </NavLink>
          </div>
          <div className={style.containerPostContent}>
            <div style={{ display: 'flex' }}>
              <NavLink to={`/profiles/${post.User?.id}`} className={style.aInPost}>
                <p className={style.user_name}>{post.User.name}</p>
              </NavLink>
            </div>
            <p className={style.time}>{formatDateTime(post.createdAt)}</p>
            <p className={style.content}>{post.content}</p>

            {post.img && <img src={post.img} alt="" className={style.postImg} />}
            <div className={style.function}>
              {user ? (
                <div className={style.one}>
                  <img
                    className={style.img}
                    src={commentImg}
                    alt="img"
                    onClick={() => setComState((prev) => !prev)}
                  />
                  <p className={style.counter}>{post.Comments.length}</p>
                </div>
              ) : (
                <div className={style.one}>
                  <img className={style.img} src={commentImg} alt="img" />
                  <p className={style.counter}>{post.Comments.length}</p>
                </div>
              )}
              {/* {like} */}
              {user ? (
                <div className={style.fre}>
                  {findUserInLikePost ? (
                    <img
                      src={like}
                      alt="full"
                      className={style.img}
                      data-like={post.PostLikes.length}
                      onClick={() => {
                        dispatch(
                          DisLikePost({
                            postId: post.id,
                            userId: user.id,
                          }),
                        );
                      }}
                    />
                  ) : (
                    <img
                      src={emptyLike}
                      alt="empty"
                      className={style.img}
                      data-like={post.PostLikes.length}
                      onClick={() => {
                        dispatch(
                          LikePost({
                            postId: post.id,
                            userId: user.id,
                            like: post.PostLikes.length,
                          }),
                        );
                      }}
                    />
                  )}
                  <div className="count">{post.PostLikes.length}</div>
                </div>
              ) : (
                <div className={style.fre}>
                  <img src={like} alt="full" className={style.img} data-id={post.id} />
                  <div className="count">{post.PostLikes.length}</div>
                </div>
              )}

              {/* //// избранное */}
              {user ? (
                <div className={style.foo}>
                  {findUserInFavoritesPost ? (
                    <img
                      src={disfavorite}
                      alt="full"
                      className={style.img}
                      onClick={() =>
                        dispatch(
                          DisFavoritesPost({
                            postId: post.id,
                            userId: user.id,
                          }),
                        )
                      }
                    />
                  ) : (
                    <img
                      src={favorite}
                      alt="full"
                      className={style.img}
                      onClick={() =>
                        dispatch(
                          FavoritesPost({
                            postId: post.id,
                            userId: user.id,
                          }),
                        )
                      }
                    />
                  )}
                </div>
              ) : (
                <div className={style.foo}>
                  <img src={favorite} alt="full" className={style.img} />
                </div>
              )}
              {/* избранное */}
            </div>
          </div>
          {(user?.id === post.userId || user?.isAdmin === true) && (
            <div className={style.containerPostMore} onClick={() => dispatch(DelPost(post.id))}>
              X
            </div>
          )}
        </div>

        {stateCom && (
          <>
            {post.Comments.map((comment) => (
              <div key={comment.id}>
                <div className={style.containerPostTwo}>
                  <div className={style.containerPostPhotoCom}>
                    <img className={style.ImgCom} src={comment.User.img} alt="фотоUSer" />
                  </div>
                  <div className={style.NameComment}>
                    <div>{comment.User.name}</div>
                    <div className={style.Comment}>{comment.content}</div>
                  </div>
                  {(user?.id === comment.userId || user?.isAdmin === true) && (
                    <div className={style.delComment}>
                      {' '}
                      <div
                        className={style.containerPostMore}
                        onClick={() =>
                          dispatch(DelComment({ commentId: comment.id, postId: post.id }))
                        }
                      >
                        X
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(
                  AddComment({
                    postId: post.id,
                    userId: +post.User.id,
                    content: text,
                  }),
                )
                  .then(() => {
                    setText('');
                  })
                  .catch(console.log);
              }}
            >
              <div className={style.containerPostForm}>
                <div className={style.containerPostPhotoForm}>
                  <img className={style.ImgForm} src={user!.img} alt="фотоUSer" />
                </div>
                <div className={style.contInpCom}>
                  <input
                    className={style.Input}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    value={text}
                    placeholder="Написать комментарий..."
                  />
                </div>
                <div className={style.containerBtn}>
                  <button type="submit" className={style.btn}>
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default PostItem;
