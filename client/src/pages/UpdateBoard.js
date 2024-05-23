import React, { useEffect, useState } from 'react';
import Header from './Header';
import styles from './UpdateBoard.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateBoard({ isLogin }) {
  const { boardId } = useParams();

  const navigate = useNavigate();

  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  const [postData, setPostData] = useState('');

  //수정할 글의 DB 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/boardDetail/' + boardId)
      .then((res) => {
        const post = res.data;
        setPostData(post);
        console.log('--post--: ' + JSON.stringify(post));

        setTitle(post.title);
        setContent(post.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  //글 수정
  const submitUpdateForm = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();

    axios
      .post('http://localhost:3002/board/updateBoard/' + boardId, {
        title: Title,
        content: Content,
      })
      .then((res) => {
        console.log(res);
        window.alert('글을 성공적으로 수정하였습니다.');
        navigate('/post/' + boardId);
      })
      .catch((err) => {
        console.log(err);
        window.alert('글이 정상적으로 수정되지 않았습니다.');
        navigate(-1);
      });
  };

  const onConcelBtn = (evernt) => {
    navigate(-1);
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.write_container}>
          <span>글 수정하기</span>
          <form onSubmit={submitUpdateForm} className={styles.write_form}>
            <div className={styles.write_title}>
              <label htmlFor="title"></label>
              <input type="text" value={Title} onChange={onTitleHandler} />
            </div>
            <div className={styles.write_content}>
              <label htmlFor="content"></label>
              <textarea
                type="text"
                value={Content}
                onChange={onContentHandler}
              />
            </div>
            <div className={styles.btn_box}>
              <button className={styles.write_cancel} conClike={onConcelBtn}>
                취소
              </button>
              <button type="submit" className={styles.write_submitb}>
                수정
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default UpdateBoard;
