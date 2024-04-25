import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CheckPass.module.css';

function CheckPass() {
  const [Password, setPassword] = useState();

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(Password);
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
        <div className={styles.ck_form}>
          <form onSubmit={onSubmitHandler}>
            <label className={styles.ck_label}>
              정보 수정을 위해 비밀번호를 확인해주세요
            </label>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            ></input>
            <button type="submit" className={styles.ckPass_submitb}>
              확인
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CheckPass;
