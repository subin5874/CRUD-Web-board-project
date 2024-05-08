import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import styles from './Board.module.css';
import Header from './Header';
import axios from 'axios';

function Board({ isLogin }) {
  const { boardId } = useParams();
  console.log('--board_Id--' + boardId);
  const [postData, setPostData] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/boardDetail/' + boardId)
      .then((res) => {
        console.log('res.data: ' + res.data);

        let post = res.data;

        console.log('post: ' + JSON.stringify(post));
        setPostData(post);
        //if (postData.Member.userName) {
        // console.log('postData: ' + JSON.stringify(postData.Member.userName));
        //}
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [likeState, setLikeState] = useState(0);
  let [likeSum, setLikeSum] = useState(10);

  const [comment, setComment] = useState();

  const onCommentHandler = (event) => {
    event.preventDefault();
    setComment(event.currentTarget.value);
  };

  const submitForm = (event) => {
    // 버튼만 누르면 리로드 되는것을 막아줌
    event.preventDefault();
    console.log(comment);

    axios
      .post('http://localhost:3002/comment/write', {
        comment: comment,
        board_id: postData.board_id,
        user_id: sessionStorage.getItem('user_id'),
      })
      .then((res) => {
        console.log(res);
        window.alert('댓글을 성공적으로 작성하였습니다.');
      })
      .catch((err) => {
        console.log(err);
        window.alert('댓글 작성이 정상적으로 되지 않았습니다.');
      });
  };

  const [commentList, setCommentList] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/commentList/' + boardId)
      .then((res) => {
        const comments = res.data;
        console.log('--comment--' + JSON.stringify(comments));
        setCommentList(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <span>게시글</span>
        <div className={styles.board_header}>
          <span>{postData.title}</span>
          <div className={styles.board_data}>
            <span>postData.Member.userName</span>
            <span>{postData.createdAt}</span>
          </div>
        </div>
        <div className={styles.board_content}>
          <span>{postData.content}</span>
        </div>
        <div className={styles.board_box}>
          <div className={styles.like_article}>
            <div
              className={styles.like_icon}
              onClick={() => {
                setLikeState(!likeState);
                if (likeState === 0) {
                  likeSum -= 1;
                } else if (likeState === 1) {
                  likeSum += 1;
                }
              }}
            >
              {!likeState ? (
                <img src="/assets/Board/icon-heart.png" alt="하트" />
              ) : (
                <img src="/assets/Board/icon-heart-full.png" alt="하트" />
              )}
            </div>
            <span>좋아요</span>
            <span className={styles.like_sum}>{likeSum}</span>
          </div>
          <div className={styles.comment_article}>
            <img src="/assets/Board/icon-chat.png" alt="댓글" />
            <span>댓글</span>
            <span className={styles.comment_sum}>3</span>
          </div>
        </div>
        <div className={styles.board_comment}>
          <span>댓글</span>
          {commentList &&
            commentList.map((data, i) => {
              return (
                <div className={styles.comment_container}>
                  <span className={styles.comment_writer}>
                    {data.Member.userName}
                  </span>
                  <span className={styles.comment}>{data.comment}</span>
                  <span className={styles.comment_date}>{data.createdAt}</span>
                </div>
              );
            })}
          {isLogin ? (
            <form onSubmit={submitForm} className={styles.comment_form}>
              <input
                type="text"
                placeholder="댓글을 작성해주세요."
                value={comment || ''}
                onChange={onCommentHandler}
              />
              <button type="submit" className={styles.comment_submitb}>
                등록
              </button>
            </form>
          ) : (
            <div className={styles.disable_comment}>
              <Link to="/login" className={styles.disable_message}>
                로그인하고 댓글을 작성하세요.
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Board;
