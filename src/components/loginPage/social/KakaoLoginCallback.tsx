import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginData } from 'apiTypes/data-contracts';
import { AxiosResponse } from 'axios';
import axios from "axios";
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

// const KakaoLoginCallback = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const api = new Api();
//   console.log("callback success")

//   useEffect(() => {
//     console.log("callback useeffect success")
//     const handleKakaoLogin = async () => {
//       const query = new URLSearchParams(location.search);
//       const code = query.get("code");
//       console.log("카카오 로그인 응답:", code);

//       if (code) {
//         try {
//           console.log("Kakao API 호출 전");
//           // const response: AxiosResponse<LoginData> = await api.kakaoLogin(code);
//         //   const response = await axios.post(`/api/auth/oauth/kakao`, null, {
//         //     params: { code }
//         // });
//         const response = await axios.post(`http://localhost:8080/api/auth/oauth/kakao`, null, {
//           params: { code }
//         });
//           console.log('API 응답:', response);

//           const token = response.data.accessToken;
//           const role = response.data.role ?? null;

//           if (token) {
//             Token.setToken = token.toString();
//             console.log('Access Token:', token);
//           } else {
//             console.error('Access Token이 없습니다.');
//           }

//           if (role) {
//             localStorage.setItem('userRole', role);
//             console.log('Role:', role);
//           } else {
//             console.error('Role 정보가 없습니다.');
//           }

//           alert('카카오 로그인 성공!');
//           navigate('/');
//           return;
//         } catch (error) {
//           console.error('카카오 로그인 실패:', error);
//           navigate('/login');
//         }
//       } else {
//         console.error("인증 코드가 없습니다. 또는 경로가 올바르지 않습니다.");
//       }
//     };

//     handleKakaoLogin();
//   }, [location, api, navigate]);

//   return <div>카카오 로그인 처리 중...</div>;
// };

// export default KakaoLoginCallback;
const KakaoLoginCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("callback success")

  useEffect(() => {
    console.log("callback useeffect success")
    const handleKakaoLogin = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get("code");
      // console.log("카카오 로그인 응답:", code);

      if (code) {
        try {
          console.log("Kakao API 호출 전");
          
          // Fetch를 사용하여 카카오 로그인 API 호출
          const response = await fetch(`http://localhost:8080/api/auth/oauth/kakao?code=${code}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
          }

          const responseData = await response.json();
          // console.log('API 응답:', responseData);

          const token = responseData.accessToken;
          const role = responseData.role ?? null;

          if (token) {
            Token.setToken = token.toString();
            // console.log('Access Token:', token);
          } else {
            console.error('Access Token이 없습니다.');
          }

          if (role) {
            localStorage.setItem('userRole', role);
            // console.log('Role:', role);
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
  }, [location, navigate]);

  const handleLoginClick = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      `https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin + '/oauth/redirected/kakao')}&response_type=code`,
      'kakaoLoginPopup',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <div>
      <button onClick={handleLoginClick}>카카오 로그인</button>
      <div>카카오 로그인 처리 중...</div>
    </div>
  );
};

export default KakaoLoginCallback;


// import React, { useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useLocation } from "react-router-dom";

// const Kakao: React.FC = () => {
//   const navigate = useNavigate();
//   console.log('callback start');
//   const href = window.location.href;
//   const params = new URLSearchParams(window.location.search);
//   const code = params.get("code");
//   console.log('code',code);

//   useEffect(() => {
//     const kakaoLogin = async () => {
//       if (code) {
//         try {
//           const response = await axios.post(`/api/auth/oauth/kakao?code=${code}`);
//           console.log("로그인 성공:", response.data);
//           navigate('/');
//         } catch (error) {
//           console.error("로그인 실패:", error);
//           navigate('/login');
//         }
//       }
//     };
//     kakaoLogin();
//   }, [code]);

//   return <div>카카오 로그인 처리 중...</div>;
// };

// export default Kakao;
