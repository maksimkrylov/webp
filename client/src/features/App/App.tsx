import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChatPage from '../Chat/ChatPage';
import { checkUser, stopLoadingAu } from '../Page/SignPage/authSlice';
import { loadProfiles, stopLoading } from '../Page/ProfilePage/profileSlice';
import { loadPosts } from '../Page/WelcomPage/postsSlice';
import SignInPage from '../Page/SignPage/SignInPage';
import NavBar from '../UI/NavBar/NavBar';
import NewsPage from '../Page/NewsPage/NewsPage';
import ProfilePage from '../Page/ProfilePage/ProfilePage';
import WelcomPage from '../Page/WelcomPage/WelcomPage';
import SignUpPage from '../Page/SignPage/SignUpPage';

import { loadReating } from '../UI/LeftColumn/reatingSlice';
import { Page404 } from '../Page/404/404';
import { loadChats } from '../Chat/chatSlice';
import { RootState, useAppDispatch } from '@/redux/store';


function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useSelector((store: RootState) => store.auth.auth);

  useEffect(() => {
    if (user) {
      dispatch(loadChats()).catch(console.log);
    }
    dispatch(checkUser()).catch(console.log);
    dispatch(loadProfiles()).catch(console.log);
    dispatch(loadReating()).catch(console.log);
    setTimeout(() => dispatch(stopLoading()), 1000);
    setTimeout(() => dispatch(stopLoadingAu()), 1000);
    dispatch(loadPosts()).catch(console.log);
    dispatch(stopLoading());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profiles/:profileId" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:receiverId" element={<ChatPage />} />
          <Route path="/*" element={<Page404 />} />
        </Route>
        <Route index element={<WelcomPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
