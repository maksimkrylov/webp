/* eslint-disable no-useless-computed-key */
import React from 'react';
import styles from './slider.module.css'; // Импортируем CSS модуль
import PostItem from '../PostItem/PostItem';
import type { Post } from '../../Page/WelcomPage/types';

function Slider({ posts }: { posts: Post[] }): JSX.Element {
  const animationTiming = 3;
  const animationDuration = animationTiming * posts.length;

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.carousel}
        // style={{ ['--animation-duration']: `${animationDuration}s` }}
        // style={{ ['animation']: `carousel-animate-vertical ${animationDuration}s linear infinite` }}
      >
        {posts.map((post, idx) => (
          <div
            className={styles.carousel__item}
            style={{
              animationDelay: `calc(${(animationDuration / posts.length) * (idx - 2)}s)`,
            }}
          >
            <PostItem key={post.id} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
