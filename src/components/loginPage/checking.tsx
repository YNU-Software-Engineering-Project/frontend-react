import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from 'apiTypes/Token';

function checking() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Token.getToken?.split(' ')[1];
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decodedToken = JSON.parse(jsonPayload);
        const currentTime = Math.floor(Date.now() / 1000);

        // 토큰 만료 시 로그아웃 처리
        if (decodedToken.exp < currentTime) {
            Token.removeToken();
            localStorage.removeItem('userRole');
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            navigate('/login');
          }
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        Token.removeToken();
        localStorage.removeItem('userRole');
        navigate('/login');
      }
    }
  }, [navigate]);

  return null;
}

export default checking;
