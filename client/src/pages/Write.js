import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Write.module.css';
import Header from './Header';

function Write({ isLogin }) {
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
      <Header isLogin={isLogin} />
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
