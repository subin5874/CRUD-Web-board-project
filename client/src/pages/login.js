import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Login({ isLogin }) {
  const [ID, setID] = useState();
  const [Password, setPassword] = useState();

  //이전 페이지의 url 가져오기
  const location = useLocation();
  const gobackURL = location.state.pathname.pathname;
  const navigate = useNavigate();

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3002/user_inform/login', {
        id: ID,
        password: Password,
      })
      .then((res) => {
        if (res.data.id === undefined) {
          console.log('====로그인 실패 ====');
          alert('입력하신 아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (res.data.id === ID) {
          console.log('====로그인 성공 ====');
          //로그인 성공시 sessionStorage에 사용자 정보를 넣어준다
          sessionStorage.setItem('user_id', res.data.user_id);
          sessionStorage.setItem('id', res.data.id);
          sessionStorage.setItem('userName', res.data.userName);
          alert('로그인에 성공했습니다.');
          if (gobackURL == '/registration') {
            navigate('/');
            window.location.reload();
          } else {
            navigate(gobackURL);
            window.location.reload();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <section className={styles.container}>
        <Link to="/" className={styles.goHomebtn}>
          <img
            className={styles.logo_img}
            src="/assets/Logo/logo.png"
            alt="로고"
          />
        </Link>
        <div className={styles.login_container}>
          <form onSubmit={onSubmitHandler} className={styles.login_form}>
            <article className={styles.login__items}>
              <input
                type="text"
                placeholder="아이디"
                value={ID || ''}
                onChange={onIDHandler}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={Password || ''}
                onChange={onPasswordHandler}
              />
            </article>
            <span className={styles.registration_notice}>
              아직 회원이 아니신가요? <Link to="/registration">회원가입</Link>
            </span>
            <button type="submit" className={styles.login_submitb}>
              로그인
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
