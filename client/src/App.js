import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import Registration from './pages/Registration';
import CheckPass from './pages/CheckPass';
import Board from './pages/Board';
import Mypage from './pages/Mypage';
import Write from './pages/Write';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
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
