import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Board.module.css';
import Header from './Header';
import axios from 'axios';

function Board({ isLogin }) {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/boardDetail/' + boardId)
      .then((res) => {
        console.log('res.data: ' + res.data);

        let post = res.data;

        console.log('post: ' + JSON.stringify(post));
        setPostData(post);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [commentList, setCommentList] = useState('');

  //댓글 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/commentList/' + boardId)
      .then((res) => {
        const comments = res.data.reverse();
        console.log('--comment--' + JSON.stringify(comments));
        setCommentList(comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [commentCount, setCommentCount] = useState(0);

  //댓글 수 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/commentCount/' + boardId)
      .then((res) => {
        console.log('--likeCount--' + JSON.stringify(res));
        setCommentCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [comment, setComment] = useState();

  const onCommentHandler = (event) => {
    event.preventDefault();
    setComment(event.currentTarget.value);
  };

  const submitForm = (event) => {
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
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.alert('댓글 작성이 정상적으로 되지 않았습니다.');
      });
  };

  const userId = sessionStorage.getItem('user_id');

  const onUpdateBoardBtn = (evernt) => {
    navigate('/updateBoard/' + boardId);
  };
  const onDeleteBoardBtn = (evernt) => {
    if (window.confirm('글을 삭제하시겠습니까?') == true) {
      //확인
      axios
        .post('http://localhost:3002/board/deleteBoard/' + boardId)
        .then((res) => {
          window.alert('글을 성공적으로 삭제했습니다.');
        })
        .catch((err) => {
          console.log(err);
          window.alert('글이 정상적으로 삭제되지 않았습니다.');
        });
    } else {
      //취소
      return false;
    }
  };

  const onDeleteCommentBtn = (event) => {
    console.log(event.currentTarget.value);
    const commentId = event.currentTarget.value;

    if (window.confirm('댓글을 삭제하시겠습니까?') == true) {
      //확인
      axios
        .post('http://localhost:3002/comment/deleteComment/' + commentId)
        .then((res) => {
          window.alert('댓글을 성공적으로 삭제했습니다.');
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          window.alert('댓글이 정상적으로 삭제되지 않았습니다.');
        });
    } else {
      //취소
      return false;
    }
  };

  const [likeState, setLikeState] = useState(false);
  let [likeCount, setLikeCount] = useState(1);

  useEffect(() => {
    //로그인한 사용자의 해당 글 좋아요 여부 가져오기
    axios
      .get('http://localhost:3002/like/likeState/' + boardId + '/' + userId)
      .then((res) => {
        console.log('--like--' + JSON.stringify(res));
        if (res.data == null) {
          setLikeState(false);
          console.log('좋아요 상태: ' + likeState);
        } else {
          setLikeState(true);
          console.log('좋아요 상태: ' + likeState);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    //해당 글의 전체 좋아요 수 가져오기
    axios
      .get('http://localhost:3002/like/likeCount/' + boardId)
      .then((res) => {
        console.log('--likeCount--' + JSON.stringify(res));
        setLikeCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickLogin = () => {
    //로그인 여부 물어보는 걸로 바꾸기!!!
    window.alert('로그인후 이용 가ㅡㅇㄹ');
  };

  const onClickLike = () => {
    setLikeState(!likeState);
    console.log('좋아요 상태: ' + likeState);
    if (likeState == false) {
      //좋아요 db 생성
      axios
        .post('http://localhost:3002/like/addLike', {
          board_id: boardId,
          user_id: userId,
        })
        .then((res) => {
          console.log('좋아요 추가 완료');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //좋아요 db 삭제
      axios
        .post('http://localhost:3002/like/deleteLike', {
          board_id: boardId,
          user_id: userId,
        })
        .then((res) => {
          console.log('좋아요 제거 완료');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            {isLogin ? (
              <div className={styles.like_icon} onClick={onClickLike}>
                {likeState ? (
                  <img
                    src="/assets/Board/icon-heart-full.png"
                    alt="채워진하트"
                  />
                ) : (
                  <img src="/assets/Board/icon-heart.png" alt="하트" />
                )}
              </div>
            ) : (
              <div className={styles.like_icon} onClick={onClickLogin}>
                <img src="/assets/Board/icon-heart.png" alt="하트" />
              </div>
            )}

            <span>좋아요</span>
            <span className={styles.like_sum}>{likeCount}</span>
          </div>
          <div className={styles.comment_article}>
            <img src="/assets/Board/icon-chat.png" alt="댓글" />
            <span>댓글</span>
            <span className={styles.comment_sum}>{commentCount}</span>
          </div>
          {userId == postData.user_id ? (
            <div className={styles.right_article}>
              <button onClick={onUpdateBoardBtn} className={styles.userbtn}>
                수정
              </button>
              <button onClick={onDeleteBoardBtn} className={styles.userbtn}>
                삭제
              </button>
            </div>
          ) : (
            ''
          )}
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
                  <div className={styles.comment_bottom_article}>
                    <span className={styles.comment_date}>
                      {data.createdAt}
                    </span>
                    {userId == data.user_id ? (
                      <div className={styles.comment_right_article}>
                        <button
                          value={data.comment_id}
                          onClick={onDeleteCommentBtn}
                          className={styles.userbtn}
                        >
                          삭제
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
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
