import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import { Token } from "apiTypes/Token";

const GoogleLoginCallback = () => {
  const navigate = useNavigate();

  // 이미 가입한 유저일 시 : 메인 페이지로 이동
  const handleHome = () => {
    navigate("/");
    window.location.reload();
  };

  // 처음 가입한 유저일 시 : 닉네임 설정 페이지로 이동
  const handleNickName = () => {
    navigate("/register");
    window.location.reload();
  };

  // 현재 url에서 code 부분 추출
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const handleLoginPost = async (code: string) => {
    // const data = {
    //   code: code,
    // };
    try {
      // const res = await axios.post(`http://localhost:8080/api/auth/oauth/google`, null, {
      //             params: { code }
      //           });
      const response = await fetch(`http://localhost:8080/api/auth/oauth/google?code=${code}`, {
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
       // 토큰 localstorage에 저장
      //  const accessToken = res.data.accessToken;
      //  localStorage.setItem("bagtoken", accessToken);
      //  // 신규/기존 회원 여부에 따라 페이지 이동
      //  res.data.isExistingMember ? handleHome() : handleNickName();

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

          alert('google 로그인 성공!');
          navigate('/');
          return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code) {
      handleLoginPost(code);
    } else {
      console.log("로그인 재시도하세요.");
    }
  }, [code, navigate]);

  return <div>google 로그인 처리 중...</div>;
};