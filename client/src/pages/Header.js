import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate, useLocation, useMatch } from 'react-router-dom';

function Header({ isLogin }) {
  const navigate = useNavigate();
  const isMatchPath = useMatch('/mypage');
  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제
    sessionStorage.removeItem('user_id');

    if (isMatchPath !== null) {
      navigate('/');
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  const pathname = useLocation();

  const onLogin = () => {
    navigate('/login', { state: { pathname: pathname } });
  };

  return (
    <div className={styles.header_container}>
      <header className={styles.header}>
        <Link to="/" className={styles.home_logo}>
          <img
            className={styles.logo_img}
            src="/assets/Logo/logo.png"
            alt="로고"
          />
        </Link>
        {isLogin ? (
          <div className={styles.member_button}>
            <button type="button" className={styles.green_btn}>
              <Link to="/mypage">내 정보</Link>
            </button>
            <button type="button" className={styles.white_btn}>
              <Link to="#" onClick={onLogout}>
                로그아웃
              </Link>
            </button>
          </div>
        ) : (
          <div className={styles.member_button}>
            <button
              type="button"
              className={styles.white_btn}
              onClick={onLogin}
            >
              로그인
            </button>
            <button type="button" className={styles.green_btn}>
              <Link to="/registration">회원가입</Link>
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
