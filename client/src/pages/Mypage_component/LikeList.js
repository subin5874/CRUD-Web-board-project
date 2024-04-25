import React from 'react';
import styles from './LikeList.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function LikeList() {
  const [postData, setPostData] = useState([
    {
      title: '안녕하세요 처음 글을 써요',
      name: '겨울 개구리',
      date: '2024-03-14',
      like: 13,
      comment: 3,
    },
    {
      title: '오늘 날씨는 맑음 입니다.',
      name: '북극곰 눈물',
      date: '2024-03-14',
      like: 9,
      comment: 0,
    },
    {
      title: '제주도 맛집을 추천해주세요',
      name: '덕소요정',
      date: '2024-03-14',
      like: 3,
      comment: 15,
    },
  ]);
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
        {postData.map((data, i) => {
          return (
            <tr>
              <td className={styles.t_title}>
                <div>
                  <Link to="/board" className={styles.title_link}>
                    {data.title}
                  </Link>
                  <span className={styles.comment_num}>[{data.comment}]</span>
                </div>
              </td>
              <td className={styles.t_name}>
                <div>
                  <span>{data.name}</span>
                </div>
              </td>
              <td className={styles.t_date}>
                <div>
                  <span>{data.date}</span>
                </div>
              </td>
              <td className={styles.t_like}>
                <div>
                  <span>{data.like}</span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default LikeList;
