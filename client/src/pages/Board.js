import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Board.module.css';

function Board() {
  const [likeState, setLikeState] = useState(0);
  let [likeSum, setLikeSum] = useState(10);
  const [comment, setComment] = useState();
  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value);
  };

  const [commentList, setCommentList] = useState([
    {
      writer: '덕소 요정',
      comment: '제주도 근처 공항에 있는 고기국수 추천',
      date: '2013.04.03',
    },
    {
      writer: '겨울 개구리',
      comment: '우진해장국 아시나요? 웨이팅은 긴데 맛나요.',
      date: '2013.04.03',
    },
  ]);

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
        <span>게시글</span>
        <div className={styles.board_header}>
          <span>제주도 맛집 추천 부탁</span>
          <div className={styles.board_data}>
            <span>북극곰 눈물</span>
            <span>2024.03.22</span>
          </div>
        </div>
        <div className={styles.board_content}>
          <span>
            다음주에 제주도 여행을 가게 되었습니당. 맛집 많이 추천 해주세용.
          </span>
        </div>
        <div className={styles.board_box}>
          <div className={styles.like_article}>
            <div
              className={styles.like_icon}
              onClick={() => {
                setLikeState(!likeState);
                if (likeState == 0) {
                  likeSum -= 1;
                } else if (likeState == 1) {
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
          {commentList.map((data, i) => {
            return (
              <div className={styles.comment_container}>
                <span className={styles.comment_writer}>{data.writer}</span>
                <span className={styles.comment}>{data.comment}</span>
                <span className={styles.comment_date}>{data.date}</span>
              </div>
            );
          })}
          <form className={styles.comment_form}>
            <input
              type="text"
              placeholder="댓글을 작성해주세요."
              value={comment}
              onChange={onCommentHandler}
            />
            <button type="submit" className={styles.comment_submitb}>
              등록
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Board;
