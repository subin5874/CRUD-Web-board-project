import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, differenceInHours } from 'date-fns';
import styles from './Home.module.css';
import Header from './Header';
import axios from 'axios';

function Home({ isLogin }) {
  const userId = sessionStorage.getItem('user_id');
  const [postList, setPostList] = useState('');
  useEffect(() => {
    //전체 게시글 가져옴
    axios
      .get('http://localhost:3002/board/boardList')
      .then((res) => {
        const list = res.data;
        setPostList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const postCount = postList.length;

  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    //전체 글의  좋아요 수 가져오기
    axios
      .get('http://localhost:3002/like/likeCount')
      .then((res) => {
        const likeCountList = res.data;
        setLikeCount(likeCountList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [commentCount, setcommentCount] = useState(0);
  useEffect(() => {
    //전체 글의  댓글 수 가져오기
    axios
      .get('http://localhost:3002/comment/commentCount')
      .then((res) => {
        const commentCountList = res.data;
        setcommentCount(commentCountList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [updatedPostList, setUpdatePostList] = useState([]);

  useEffect(() => {
    console.log(JSON.stringify(commentCount));
    console.log(Array.isArray(commentCount));
    if (Array.isArray(commentCount) && Array.isArray(likeCount)) {
      const commentCountMap = commentCount.reduce((map, item) => {
        map[item.board_id] = item.commentCount;
        return map;
      }, {});

      const likeCountMap = likeCount.reduce((map, item) => {
        map[item.board_id] = item.likeCount;
        return map;
      }, {});

      // postList 배열에 commentCount 추가
      const updatedList = postList.map((post) => {
        //댓글 수와 좋아요 수
        const commentCount = commentCountMap[post.board_id] || 0;
        const likeCount = likeCountMap[post.board_id] || 0;

        //createdAt 변경
        const currentDate = new Date();
        const createdAtDate = new Date(post.createdAt);
        const hoursDiff = differenceInHours(currentDate, createdAtDate);
        const formattedDate = format(new Date(post.createdAt), 'yyyy.MM.dd');

        let formattedDateTime;
        if (hoursDiff < 24) {
          formattedDateTime = format(createdAtDate, 'HH:mm');
        } else {
          formattedDateTime = format(createdAtDate, 'yyyy.MM.dd');
        }

        //댓글수, 좋아요수, createdAt 적용
        return {
          ...post,
          commentCount: commentCount,
          likeCount: likeCount,
          createdAt: formattedDateTime,
        };
      });
      setUpdatePostList(updatedList);
    }
  }, [commentCount, likeCount]);

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.table_container}>
          <div className={styles.top_bar}>
            <span>{postCount}개의 글</span>
            {isLogin ? (
              <div className={styles.write_post}>
                <Link to="/write" className={styles.write_post_btn}>
                  글쓰기
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <table>
            <thead className={styles.thead}>
              <tr>
                <th scope="col">제목</th>
                <th scope="col">작성자</th>
                <th scope="col">작성일</th>
                <th scope="col">좋아요</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {updatedPostList &&
                updatedPostList.map((data, i) => {
                  return (
                    <tr>
                      <td className={styles.t_title}>
                        <div>
                          <Link
                            to={`/post/${data.board_id}`}
                            className={styles.title_link}
                          >
                            {data.title}
                          </Link>
                          {data.commentCount != 0 ? (
                            <div className={styles.commentCount_box}>
                              <span className={styles.comment_num}>
                                [{data.commentCount}]
                              </span>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </td>
                      <td className={styles.t_name}>
                        <div>
                          <span>{data.Member.userName}</span>
                        </div>
                      </td>
                      <td className={styles.t_date}>
                        <div>
                          <span>{data.createdAt}</span>
                        </div>
                      </td>
                      <td className={styles.t_like}>
                        <div>
                          <span>{data.likeCount}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Home;
