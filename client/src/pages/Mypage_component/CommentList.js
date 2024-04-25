import React from 'react';
import styles from './CommentList.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CommentList() {
  const [commentData, setCommentData] = useState([
    {
      title: '제주도 맛집을 추천해주세요',
      comment: '제주도 공항 근처 고기국수 추천합니다.',
      date: '2024-03-14',
      like: 3,
    },
    {
      title: '오늘의 날씨는 맑음입니다.',
      comment: '오늘따라 날씨가 좋네요. 한강가기 좋아요.',
      date: '2024-03-14',
      like: 3,
    },
  ]);
  return (
    <table>
      <thead className={styles.thead}>
        <tr>
          <th>댓글</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {commentData.map((data, i) => {
          return (
            <tr>
              <td>
                <div className={styles.comment_box}>
                  <Link to="/board" className={styles.to_board}>
                    <div className={styles.comment}>
                      <span>{data.comment}</span>
                    </div>
                    <div className={styles.comment_date}>
                      <span>{data.date}</span>
                    </div>
                    <div className={styles.board_title}>
                      <span className={styles.title}>{data.title}</span>
                      <span className={styles.comment_num}>[{data.like}]</span>
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
