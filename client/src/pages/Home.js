import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Header from './Header';
import axios from 'axios';

function Home({ isLogin }) {
  const [postList, setPostList] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/boardList')
      .then((res) => {
        const list = res.data;

        console.log('list: ' + JSON.stringify(list));
        setPostList(list);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get('http://localhost:3002/board/commentCount')
    //   .then((res) => {
    //     console.log('res.data: ' + res.data);

    //     const clist = res.data;

    //     console.log('list: ' + JSON.stringify(clist));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.table_container}>
          <div className={styles.top_bar}>
            <span>12개의 글</span>
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
              {postList &&
                postList.map((data, i) => {
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
                          <span>1</span>
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
