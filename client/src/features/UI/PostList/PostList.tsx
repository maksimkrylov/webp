/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */
import React from 'react';
import style from './postlist.module.css';
import PostItem from '../PostItem/PostItem';
import type { Post } from '../../Page/WelcomPage/types';

const PostList = ({ posts }: { posts: Post[] }): JSX.Element => (
  <>
    <div className={style.containerList}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  </>
);

export default PostList;
