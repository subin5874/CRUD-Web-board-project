import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';

function Mypage() {
  const [category, setCategory] = useState('post');
  const categories = [
    { name: '작성 글', value: 'post' },
    { name: '작성 댓글', value: 'comment' },
    { name: '좋아요한 글', value: 'like' },
  ];
  const handleClickButton = (e) => {
    category = e.target.value;
    setCategory(category);
    console.log(category);
  };
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
        <div className={styles.table_container}>
          <span>내 정보</span>
          <div className={styles.mypage_header}>
            <div className="user_data">
              <span>겨울 개구리</span>
              <span>(subin5874)</span>
              <Link to="/checkPass" className="change_info_btn">
                정보 수정
              </Link>
            </div>
            <div className={styles.user_state}>
              <div className="post_data">
                <span>작성글</span>
                <span>3</span>
              </div>
              <div className="like_data">
                <span>좋아요</span>
                <span>12</span>
              </div>
            </div>
          </div>
          {categories.map((data) => {
            return (
              <div className="user_data_list">
                <button onClick={handleClickButton} name={data.value}>
                  {data.value}
                </button>
              </div>
            );
          })}
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
                        <span className={styles.comment_num}>
                          [{data.comment}]
                        </span>
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
          <table>
            <thead>
              <tr>
                <th>댓글</th>
              </tr>
            </thead>
            <tbody>
              {commentData.map((data, i) => {
                return (
                  <tr>
                    <td>
                      <div className="comment_box">
                        <Link to="/board" className="to_board">
                          <div className="comment">
                            <span>{data.comment}</span>
                          </div>
                          <div className="board_title">
                            <span className="title">{data.title}</span>
                            <span className="comment_num">[{data.like}]</span>
                          </div>
                        </Link>
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

export default Mypage;
