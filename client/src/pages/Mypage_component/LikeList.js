import React from 'react';
import styles from './LikeList.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format, differenceInHours } from 'date-fns';
import axios from 'axios';

function LikeList() {
  const [postData, setPostData] = useState([]);
  const userId = sessionStorage.getItem('user_id');
  //사용자가 작성한 글 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/board/userLikeBoardList/' + userId)
      .then((res) => {
        const userBoardList = res.data;
        setPostData(userBoardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [likeCount, setLikeCount] = useState(0);
  //사용자 글의  좋아요 수 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/like/myPostLike/likeCount/' + userId)
      .then((res) => {
        const likeCountList = res.data;
        setLikeCount(likeCountList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [commentCount, setcommentCount] = useState(0);
  //사용자 글의  댓글 수 가져오기
  useEffect(() => {
    axios
      .get('http://localhost:3002/comment/myPostLike/commentCount/' + userId)
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

      const updatedList = postData.map((post) => {
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

  console.log(JSON.stringify(updatedPostList));

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
        {updatedPostList &&
          updatedPostList.map((data, i) => {
            return (
              <tr>
                <td className={styles.t_title}>
                  <div>
                    <Link to="/board" className={styles.title_link}>
                      {data.title}
                    </Link>
                    <span className={styles.comment_num}>
                      [{data.commentCount}]
                    </span>
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
  );
}

export default LikeList;
