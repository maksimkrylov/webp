import React from "react";
import { useSelector } from "react-redux";
import PostList from "../../UI/PostList/PostList";
import AddForm from "../../UI/AddForm/AddForm";
import LeftColumn from "../../UI/LeftColumn/LeftColumn";
import style from "./style/news.module.css";
import { SortItem } from "./SortItem";
import ProfileItem from "../../UI/ProfileItem/ProfileItem";
import { RootState } from "@/redux/store";

function NewsPage(): JSX.Element {
  const posts = useSelector((store: RootState) => store.posts.posts);
  const user = useSelector((store: RootState) => store.auth.auth);

  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.containerFlexRow}>
          <div className={style.leftbox}>
            <SortItem />
            {user && <AddForm />}
            <div className={style.centerFlex}>
              <PostList posts={posts} />
            </div>
          </div>
          <div>
            {user && <ProfileItem />}
            <LeftColumn />
          </div>
        </div>
      </div>
    </main>
  );
}
export default NewsPage;
