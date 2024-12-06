import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from 'apiTypes/Token';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그아웃 처리
    Token.removeToken();
    localStorage.removeItem('userRole');
    alert('로그아웃 되었습니다.');
    navigate('/');
  }, [navigate]);

  return null; // 아무것도 렌더링하지 않음
};

export default Logout;
