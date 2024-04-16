import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [ID, setID] = useState();
  const [Password, setPassword] = useState();

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

    // axios
    //   .post('http://localhost:3001/login', {
    //     username: ID,
    //     password: Password,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="main">
      <header className={styles.header}>
        <Link to="/" className={styles.home_logo}>
          커뮤니티
        </Link>
        <div className={styles.member_button}>
          <button type="button" className={styles.login}>
            <Link to="/login">로그인</Link>
          </button>
          <button type="button" className={styles.registration}>
            <Link to="/registration">회원가입</Link>
          </button>
        </div>
      </header>
      <hr />
      <section className={styles.container}>
        <span>로그인</span>
        <div className={styles.login_container}>
          <form onSubmit={onSubmitHandler} className={styles.login_form}>
            <article className={styles.login__items}>
              <input
                type="text"
                placeholder="아이디"
                value={ID}
                onChange={onIDHandler}
              />
              <input
                type="password"
                placeholder="비밀번호"
                value={Password}
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
