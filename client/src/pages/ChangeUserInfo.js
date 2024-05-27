import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ChangeUserInfo.module.css';
import axios from 'axios';
import Header from './Header';

function ChangeUserInfo({ isLogin }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    id: sessionStorage.getItem('id'),
    user_id: sessionStorage.getItem('user_id'),
    userName: sessionStorage.getItem('userName'),
  });

  const [ID, setID] = useState(userInfo.id);
  const [UserName, setUserName] = useState(userInfo.userName);

  const onIdHandler = (e) => {
    console.log(e.currentTarget.value);
    setID(e.currentTarget.value);
  };

  const onUserNameHandler = (e) => {
    console.log(e.currentTarget.value);
    setUserName(e.currentTarget.value);
  };

  //정보 수정
  const submitForm = (data) => {
    console.log(data);

    axios
      .post(
        'http://localhost:3002/user_inform/change_info/' + userInfo.user_id,
        {
          id: data.id,
          userName: data.nick,
        }
      )
      .then((res) => {
        console.log(res);
        window.alert('정보 변경이 완료되었습니다.');
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('userName', data.nick);
        navigate('/mypage');
      })
      .catch((err) => {
        console.log(err);
        window.alert('정보 변경이 정상적으로 되지 않았습니다.');
      });
  };

  const isCancel = (e) => {
    window.alert('취소함');
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <span>정보 수정</span>
        <div className={styles.registration_container}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className={styles.registration_form}
          >
            <div className={styles.form__items}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                value={ID}
                aria-invalid={
                  isSubmitted ? (errors.id ? 'true' : 'false') : undefined
                }
                {...register('id', {
                  required: '*아이디는 필수 입력입니다.',
                  minLength: {
                    value: 8,
                    message: '*8자리 이상 아이디를 사용하세요',
                  },
                  maxLength: {
                    value: 15,
                    message: '*15자리 이하 아이디를 사용하세요',
                  },
                })}
                onChange={onIdHandler}
              />
              <span className={styles.id_warning_msg}>*중복 불가능</span>
              {errors.id && (
                <span className={styles.error_msg}>{errors.id.message}</span>
              )}
            </div>
            <div className={styles.form__items}>
              <label htmlFor="nick">닉네임</label>
              <input
                type="text"
                value={UserName}
                aria-invalid={
                  isSubmitted ? (errors.nick ? 'true' : 'false') : undefined
                }
                {...register('nick', {
                  required: '*닉네임은 필수 입력입니다.',
                  maxLength: {
                    value: 8,
                    message: '*8자리 이하 닉네임을 사용해주세요.',
                  },
                })}
                onChange={onUserNameHandler}
              />
              <span className={styles.id_warning_msg}>*중복 불가능</span>
              {errors.nick && (
                <span className={styles.error_msg}>{errors.nick.message}</span>
              )}
            </div>
            <div className={styles.btn_container}>
              <button
                type="reset"
                onClick={isCancel}
                className={styles.change_Cancel}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.change_submitb}
              >
                수정
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ChangeUserInfo;
