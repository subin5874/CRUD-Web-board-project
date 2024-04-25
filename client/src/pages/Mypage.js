import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';
import PostList from './Mypage_component/PostList';
import CommentList from './Mypage_component/CommentList';
import LikeList from './Mypage_component/LikeList';
import Header from './Header';

function Mypage({ isLogin }) {
  const [category, setCategory] = useState('post');
  const [content, setContent] = useState('post');
  const categories = [
    { name: '작성 글', value: 'post' },
    { name: '작성 댓글', value: 'comment' },
    { name: '좋아요한 글', value: 'like' },
  ];
  const handleClickButton = (e) => {
    setCategory(e.target.name);
    setContent(e.target.name);
    console.log(category);
  };

  const selectComponent = {
    post: <PostList />,
    comment: <CommentList />,
    like: <LikeList />,
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
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.table_container}>
          <span>내 정보</span>
          <div className={styles.mypage_header}>
            <div className={styles.user_data}>
              <span>겨울 개구리</span>
              <span>(subin5874)</span>
              <Link to="/checkPass" className={styles.change_info_btn}>
                정보 수정
              </Link>
            </div>
            <div className={styles.user_state}>
              <div className={styles.user_post_data}>
                <span>작성글</span>
                <span>3</span>
              </div>
              <div className={styles.user_post_data}>
                <span>좋아요</span>
                <span>12</span>
              </div>
            </div>
          </div>
          <div className={styles.user_data_list_box}>
            {categories.map((data) => {
              return (
                <div className={styles.user_data_list}>
                  <button
                    type="button"
                    name={data.value}
                    onClick={handleClickButton}
                    className={
                      category == data.value
                        ? styles.selected_list_btn
                        : styles.list_btn
                    }
                  >
                    {data.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="List_component_box">
            {content && <div>{selectComponent[content]}</div>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mypage;
