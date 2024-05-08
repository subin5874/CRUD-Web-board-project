import React, { useState, useEffect } from 'react';
import styles from './PostList.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostList() {
  const [postData, setPostData] = useState('');
  const userId = sessionStorage.getItem('user_id');
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/userBoardList/' + userId)
      .then((res) => {
        const userBoardList = res.data;

        console.log('--board--' + JSON.stringify(userBoardList));
        setPostData(userBoardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
        {postData &&
          postData.map((data, i) => {
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
                    <span className={styles.comment_num}>[1]</span>
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
                    <span>2</span>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default PostList;
