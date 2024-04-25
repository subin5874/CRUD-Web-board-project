import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
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
    </div>
  );
}

export default Header;
