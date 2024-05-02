import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Registration.module.css';
import axios from 'axios';
import Header from './Header';

function Registration({ isLogin }) {
  const [Password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const changePassword = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const navigate = useNavigate();

  //회원가입 정보 입력
  const submitForm = (data) => {
    console.log(data);

    axios
      .post('http://localhost:3002/registration', {
        id: data.id,
        password: data.password,
        userName: data.nick,
      })
      .then((res) => {
        console.log(res);
        window.alert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        window.alert('회원가입이 정상적으로 되지 않았습니다.');
      });
  };

  return (
    <div className="main">
      <Header isLogin={isLogin} />
      <section className={styles.container}>
        <span>회원가입</span>
        <div className={styles.registration_container}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className={styles.registration_form}
          >
            <div className={styles.form__items}>
              <label htmlFor="id">아이디</label>
              <input
                type="text"
                placeholder="아이디"
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
              />
              <span className={styles.id_warning_msg}>*중복 불가능</span>
              {errors.id && (
                <span className={styles.error_msg}>{errors.id.message}</span>
              )}
            </div>
            <div className={styles.form__items}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호"
                value={Password}
                aria-invalid={
                  isSubmitted ? (errors.password ? 'true' : 'false') : undefined
                }
                {...register('password', {
                  required: '*비밀번호는 필수 입력입니다.',
                  minLength: {
                    value: 10,
                    message: '*10자리 이상 비밀번호를 사용하세요',
                  },
                  maxLength: {
                    value: 20,
                    message: '*20자리 이하 비밀번호를 사용하세요',
                  },
                })}
                onChange={changePassword}
              />
              {errors.password && (
                <span className={styles.error_msg}>
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className={styles.form__items}>
              <label htmlFor="ckPassword">비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                //value={Password}
                aria-invalid={
                  isSubmitted
                    ? errors.ckPassword
                      ? 'true'
                      : 'false'
                    : undefined
                }
                {...register('ckPassword', {
                  required: '*비밀번호를 확인해주세요.',
                  pattern: {
                    value: new RegExp(`${Password}`, 'g'),
                    message: '*비밀번호가 일치하지 않습니다.',
                  },
                })}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              {errors.ckPassword && (
                <span className={styles.error_msg}>
                  {errors.ckPassword.message}
                </span>
              )}
            </div>
            <div className={styles.form__items}>
              <label htmlFor="nick">닉네임</label>
              <input
                type="text"
                placeholder="닉네임"
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
              />
              <span className={styles.id_warning_msg}>*중복 불가능</span>
              {errors.nick && (
                <span className={styles.error_msg}>{errors.nick.message}</span>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.registration_submitb}
            >
              회원가입
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Registration;
