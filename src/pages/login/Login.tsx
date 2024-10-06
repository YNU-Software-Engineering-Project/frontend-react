import { useState } from 'react';
import styles from 'styles/login/Login.module.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

        <button className={styles.signIn_button}>Sign in</button>
        <div style={{ height: 19 }}></div>

        <div className={styles.api_login}>
          <button>
            <img src="/naver.png"></img>
          </button>
          <button>
            <img src="/google.png"></img>
          </button>
          <button>
            <img src="/kakao.png"></img>
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
