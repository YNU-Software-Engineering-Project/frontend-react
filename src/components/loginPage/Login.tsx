import { useState } from 'react';
import styles from 'styles/login/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { Api } from 'apiTypes/Api';
import { LoginRequestDto, LoginData } from 'apiTypes/data-contracts';
import { AxiosResponse } from 'axios';
import { Token } from 'apiTypes/Token';
import naver from 'assets/naver.png';
import google from 'assets/google.png';
import kakao from 'assets/kakao.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const api = new Api();

  const handleLogin = async () => {
    const requestData: LoginRequestDto = {
      email,
      password,
    };

    await api
      .login(requestData)
      .then((response: AxiosResponse<LoginData>) => {
        // 로그인 성공
        const token = response.data.accessToken;
        if (token) Token.setToken = token;
        alert('로그인 성공!');
        console.log('Token set:', token);
        navigate('/');
      })
      .catch(error => {
        // 로그인 실패
        console.error('로그인 실패:', error);
        if (error.response) {
          alert(`로그인 실패: ${error.response.data.message}`);
        } else {
          alert('로그인 실패: 네트워크 오류');
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login_container}>
        <div className={styles.email_text}>Email</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.input_email}
          type="text"
          placeholder="admin@naver.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <div style={{ height: 19 }}></div>
        <div className={styles.password_text}>Password</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.input_password}
          type="text"
          placeholder="value"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <div style={{ height: 19 }}></div>

        <Button
          style={{ width: 352, height: 40, borderRadius: 2 }}
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <div style={{ height: 19 }}></div>

        <div className={styles.api_login}>
          <button>
            <img src={naver}></img>
          </button>
          <button>
            <img src={google}></img>
          </button>
          <button>
            <img src={kakao}></img>
          </button>
        </div>
        <div style={{ height: 19 }}></div>

        <div className={styles.register}>
          <Link to="./register">회원가입</Link>
        </div>
        <div style={{ height: 19 }}></div>
        <div className={styles.find_password}>
          <Link to="./forgotpassword">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
