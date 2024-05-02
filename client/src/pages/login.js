import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Login({ isLogin }) {
  const [ID, setID] = useState();
  const [Password, setPassword] = useState();

  const navigate = useNavigate();

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    console.log(ID);
    console.log(Password);

    axios
      .post('http://localhost:3002/user_inform/login', {
        id: ID,
        password: Password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log('res.data.id :: ', res.data.id);
        console.log('res.data.userName :: ', res.data.userName);
        if (res.data.id === undefined) {
          // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
          console.log('======================', res.data.msg);
          alert('입력하신 아이디 또는 비밀번호가 일치하지 않습니다.');
        } else if (res.data.id === ID) {
          // id, pw 모두 일치 userId = userId1, msg = undefined
          console.log('======================', '로그인 성공');
          sessionStorage.setItem('user_id', res.data.user_id);
          sessionStorage.setItem('id', res.data.id);
          sessionStorage.setItem('userName', res.data.userName);
          alert('로그인에 성공했습니다.');
          navigate('/');
          window.location.replace('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <span>로그인</span>
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
