import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Registration from './pages/Registration';
import CheckPass from './pages/CheckPass';
import Board from './pages/Board';
import Mypage from './pages/Mypage';
import Write from './pages/Write';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('user_id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin);
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true);
      console.log('isLogin ?? :: ', isLogin);
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home isLogin={isLogin} />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/checkPass" exact element={<CheckPass />} />
          <Route path="/board" exact element={<Board />} />
          <Route path="/mypage" exact element={<Mypage />} />
          <Route path="/write" exact element={<Write />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
