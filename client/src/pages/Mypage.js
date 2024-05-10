import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mypage.module.css';
import PostList from './Mypage_component/PostList';
import CommentList from './Mypage_component/CommentList';
import LikeList from './Mypage_component/LikeList';
import Header from './Header';

function Mypage({ isLogin }) {
  console.log(sessionStorage.data);
  const [userInfo, setUserInfo] = useState({
    id: sessionStorage.getItem('id'),
    user_id: sessionStorage.getItem('user_id'),
    userName: sessionStorage.getItem('userName'),
  });
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

  useEffect(() => {
    console.log(sessionStorage);
  });

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.table_container}>
          <span>내 정보</span>
          <div className={styles.mypage_header}>
            <div className={styles.user_data}>
              <span>{userInfo.userName}</span>
              <span>({userInfo.id})</span>
              <div className={styles.change_info}>
                <Link to="/checkPass" className={styles.change_info_btn}>
                  정보 수정
                </Link>
              </div>
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
