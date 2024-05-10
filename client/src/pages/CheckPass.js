import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CheckPass.module.css';
import Header from './Header';
import axios from 'axios';

function CheckPass({ isLogin }) {
  const navigate = useNavigate();

  const [Password, setPassword] = useState();

  const onPasswordHandler = (event) => {
    console.log(event.currentTarget.value);
    setPassword(event.currentTarget.value);
  };

  const userId = sessionStorage.getItem('user_id');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(Password);

    axios
      .post('http://localhost:3002/user_inform/checkPass', {
        password: Password,
        user_id: userId,
      })
      .then((res) => {
        if (res.data.id === undefined) {
          window.alert('비밀번호가 일치하지 않습니다.');
          window.location.reload();
        } else if (res.data.password === Password) {
          console.log('비밀번호 일치');
          navigate('/changeUserInfo');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <div className={styles.ck_form}>
          <form onSubmit={onSubmitHandler}>
            <label className={styles.ck_label}>
              정보 수정을 위해 비밀번호를 확인해주세요
            </label>
            <input
              type="password"
              value={Password}
              onChange={onPasswordHandler}
            ></input>
            <button type="submit" className={styles.ckPass_submitb}>
              확인
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default CheckPass;
