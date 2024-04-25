import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Write.module.css';

function Write() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();
  const submitForm = (data) => {
    const formData = new FormData();
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
        <div className={styles.write_container}>
          <span>글쓰기</span>
          <form
            onSubmit={handleSubmit(submitForm)}
            className={styles.write_form}
          >
            <div className={styles.write_title}>
              <input type="text" placeholder="제목을 입력하세요." />
            </div>
            <div className={styles.write_content}>
              <textarea type="text" placeholder="내용을 입력하세요." />
            </div>
            <button
              type="submit"
              className={styles.write_submitb}
              disabled={isSubmitting}
            >
              등록
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Write;
