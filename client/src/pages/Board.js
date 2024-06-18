import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import styles from './Board.module.css';
import Header from './Header';
import axios from 'axios';

function Board({ isLogin }) {
  const { boardId } = useParams();

  const pathname = useLocation();
  const navigate = useNavigate();

  const [postData, setPostData] = useState([]);
  //특정 게시글 정보 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/boardDetail/' + boardId)
      .then((res) => {
        let post = res.data;
        setPostData(post);

        //createdAt 변경
        const formatCreatedAt = (createdAt) => {
          if (!createdAt) return '';
          const createdAtDate = parseISO(createdAt);
          return format(createdAtDate, 'yyyy.MM.dd HH:mm');
        };
        setPostData((post) => {
          const newCreatedAt = formatCreatedAt(post.createdAt);
          return {
            ...post,
            createdAt: newCreatedAt,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const userId = sessionStorage.getItem('user_id');

  //글 수정버튼 클릭시 이동
  const onUpdateBoardBtn = (evernt) => {
    navigate('/updateBoard/' + boardId);
  };

  //글 삭제 버튼 클릭시
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

  const [commentList, setCommentList] = useState([]);

  //댓글 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/commentList/' + boardId)
      .then((res) => {
        const comments = res.data;

        //createdAt 변경
        const updatedComments = comments.map((post) => {
          const formattedDate = format(new Date(post.createdAt), 'yyyy.MM.dd');

          return {
            ...post,
            createdAt: formattedDate,
          };
        });
        setCommentList(updatedComments);
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

  //댓글 작성
  const submitForm = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:3002/comment/write', {
        comment: comment,
        board_id: postData.board_id,
        user_id: sessionStorage.getItem('user_id'),
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        window.alert('댓글 작성이 정상적으로 되지 않았습니다.');
      });
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
  let [likeCount, setLikeCount] = useState(0);

  //로그인한 사용자의 해당 글 좋아요 여부 가져오기
  useEffect(() => {
    if (isLogin) {
      axios
        .get('http://localhost:3002/like/likeState/' + boardId + '/' + userId)
        .then((res) => {
          if (res.data !== null && res.data !== undefined) {
            setLikeState(true);
          } else {
            setLikeState(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  //해당 글의 전체 좋아요 수 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/like/likeCount/' + boardId)
      .then((res) => {
        setLikeCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //좋아요 버튼 클릭시
  const onClickLike = async () => {
    // 상태 업데이트
    const newLikeState = !likeState;
    setLikeState(newLikeState);
    if (newLikeState) {
      //좋아요 db 생성
      await axios
        .post('http://localhost:3002/like/addLike', {
          board_id: boardId,
          user_id: userId,
        })
        .then((addResponse) => {
          if (addResponse.status === 200) {
            return axios.get('http://localhost:3002/like/likeCount/' + boardId);
          } else {
            console.error(
              '좋아요 추가 실패:',
              addResponse.status,
              addResponse.statusText
            );
            throw new Error('좋아요 추가 실패');
          }
        })
        .then((response) => {
          setLikeCount(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newLikeState === false) {
      //좋아요 db 삭제
      axios
        .post('http://localhost:3002/like/deleteLike', {
          board_id: boardId,
          user_id: userId,
        })
        .then((deleteResponse) => {
          if (deleteResponse.status === 200) {
            return axios.get('http://localhost:3002/like/likeCount/' + boardId);
          } else {
            console.error(
              '좋아요 제거 실패:',
              deleteResponse.status,
              deleteResponse.statusText
            );
            throw new Error('좋아요 제거 실패');
          }
        })
        .then((response) => {
          setLikeCount(response.data);
        })
        .catch((err) => {
          console.error('좋아요 제거 또는 좋아요 수 조회 중 에러 발생:', err);
        });
    }
  };

  //로그아웃 상태에서 좋아요 버튼 클릭시
  const onClickLogin = () => {
    var result = window.confirm('로그인후 이용 가능');
    if (result) {
      navigate('/login', { state: { pathname: pathname } });
    }
  };

  const onClickComment = () => {
    navigate('/login', { state: { pathname: pathname } });
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <span>게시글</span>
        <div className={styles.board_header}>
          <span>{postData.title}</span>
          <div className={styles.board_data}>
            <span>{postData.Member?.userName || '알 수 없음'}</span>
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
              <span onClick={onClickComment} className={styles.disable_message}>
                로그인하고 댓글을 작성하세요.
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Board;
