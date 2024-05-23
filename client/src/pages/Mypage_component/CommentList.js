import React from 'react';
import styles from './CommentList.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
import PostList from './PostList';

function CommentList() {
  const [commentData, setCommentData] = useState([]);
  const userId = sessionStorage.getItem('user_id');
  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/userCommentList/' + userId)
      .then((res) => {
        const userCommentList = res.data;
        console.log(JSON.stringify(userCommentList));
        setCommentData(userCommentList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(commentData));
  }, [commentData]);

  const [updatedList, setUpdateList] = useState([]);
  useEffect(() => {
    const updatedList = commentData.map((post) => {
      const formattedDate = format(
        new Date(post.createdAt),
        'yyyy.MM.dd HH:mm'
      );
      return {
        ...post,
        createdAt: formattedDate,
      };
    });
    setUpdateList(updatedList);
  }, [commentData]);

  return (
    <table>
      <thead className={styles.thead}>
        <tr>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {updatedList &&
          updatedList.map((data, i) => {
            return (
              <tr>
                <td>
                  <div className={styles.comment_box}>
                    <Link
                      to={`/post/${data.board_id}`}
                      className={styles.to_board}
                    >
                      <div className={styles.comment}>
                        <span>{data.comment}</span>
                      </div>
                      <div className={styles.comment_date}>
                        <span>{data.createdAt}</span>
                      </div>
                      <div className={styles.board_title}>
                        <span className={styles.title}>{data.Board.title}</span>
                      </div>
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default CommentList;
