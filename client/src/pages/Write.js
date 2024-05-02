import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Write.module.css';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Write({ isLogin }) {
  const navigate = useNavigate();

  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  const submitForm = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    console.log(Title);
    console.log(Content);

    axios
      .post('http://localhost:3002/board/write', {
        title: Title,
        content: Content,
        user_id: sessionStorage.getItem('user_id'),
      })
      .then((res) => {
        console.log(res);
        window.alert('글을 성공적으로 작성하였습니다.');
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        window.alert('글 작성이 정상적으로 되지 않았습니다.');
      });
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.write_container}>
          <span>글쓰기</span>
          <form onSubmit={submitForm} className={styles.write_form}>
            <div className={styles.write_title}>
              <label htmlFor="title"></label>
              <input
                type="text"
                placeholder="제목을 입력하세요."
                value={Title || ''}
                onChange={onTitleHandler}
              />
            </div>
            <div className={styles.write_content}>
              <label htmlFor="content"></label>
              <textarea
                type="text"
                placeholder="내용을 입력하세요."
                value={Content || ''}
                onChange={onContentHandler}
              />
            </div>
            <button type="submit" className={styles.write_submitb}>
              등록
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Write;
