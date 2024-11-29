import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginData } from 'apiTypes/data-contracts';
import { AxiosResponse } from 'axios';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

const KakaoLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const api = new Api();
  console.log("callback success")

  useEffect(() => {
    console.log("callback useeffect success")
    const handleKakaoLogin = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");
      console.log("카카오 로그인 응답:", code);

      if (code) {
        try {
          const response: AxiosResponse<LoginData> = await api.kakaoLogin(code);
          console.log('API 응답:', response);

          const token = response.data.accessToken;
          const role = response.data.role ?? null;

          if (token) {
            // Token.setToken(token); // Token 설정
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
          return;
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          navigate('/login');
        }
      } else {
        console.error("인증 코드가 없습니다. 또는 경로가 올바르지 않습니다.");
      }
    };

    handleKakaoLogin();
  }, [location, api, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginCallback;
