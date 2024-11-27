import { useState,useEffect } from 'react';
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
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { atom } from 'jotai';

export const userRoleAtom = atom<string | null>(null);

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
        const role = response.data.role ?? null;
        console.log("role",role);
        if (token) Token.setToken = token;
        if (role) {
          localStorage.setItem('userRole', role);
        }
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

  const KAKAO_CLIENT_ID = '';
  const kakao_REDIRECT_URI = `http://localhost:3000/oauth/redirected/kakao`;
  const kakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${kakao_REDIRECT_URI}&response_type=code`;
  };

  const NAVER_CLIENT_ID = '';
  const NAVER_REDIRECT_URI = 'http://localhost:3000/oauth/redirected/naver';
  const NAVER_STATE = "flase";
  const naverLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;
  };

  const GOOGLE_CLIENT_ID='';
  const GOOGLE_REDIRECT_URI = 'http://localhost:3000/oauth/redirected/google';
  const googleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${GOOGLE_CLIENT_ID}
		&redirect_uri=${GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };
  const googleLoginReact = () => {
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </GoogleOAuthProvider>
  };

  useEffect(() => {
    // 콜백 URL에서 code를 추출하여 카카오 로그인 처리
    const params = new URLSearchParams(location.search);
    console.log(params);
    const code = params.get('code');

    // 인증 코드가 있고, 경로가 콜백 경로일 때만 카카오 로그인 API를 호출
    if (code && location.pathname === '/oauth/redirected/kakao') {
      api.kakaoLogin(code)
        .then((response: AxiosResponse<LoginData>) => {
          console.log('API 응답:', response); 
          const token = response.data.accessToken;
          const role = response.data.role ?? null;

          if (token) {
            Token.setToken = token;
            console.log('Access Token:', token);
          } else {
            console.error('Access Token이 없습니다.');
          }
  
          if (role) {
            localStorage.setItem('userRole', role);
            console.log('Role:', role);
          } else {
            console.error('Role 정보가 없습니다.');
          }

          alert('카카오 로그인 성공!');
          navigate('/');
        })
        .catch((error) => {
          console.error('카카오 로그인 실패:', error);
          if (error.response) {
            alert(`카카오 로그인 실패: ${error.response.data.message}`);
          } else {
            alert('카카오 로그인 실패: 네트워크 오류');
          }
          navigate('/login');
        });
    } else {
      console.error("인증 코드가 없습니다. 또는 경로가 올바르지 않습니다.");
    }
  }, [location, api, navigate]);

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
          type="password"
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
            <img src={naver} 
            // onClick={() => socialLogin('naver')}
            onClick={naverLogin}
            ></img>
          </button>
          <button>
            <img src={google} onClick={googleLogin}></img>
          </button>
          <button>
            <img src={kakao} onClick={kakaoLogin}></img>
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
