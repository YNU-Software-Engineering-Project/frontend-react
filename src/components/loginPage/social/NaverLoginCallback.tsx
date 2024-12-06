import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NaverLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드로 코드값을 넘겨주는 로직
    // 요청 성공 코드값
    let code = new URL(window.location.href).searchParams.get("code");
    // console.log(code);

    if(code){
        navigate("/");
        return;
    }
  });

  return (
    <button onClick={() => navigate("/login")}>
            로그인 페이지로 돌아가기
          </button>
    // <div>
    //   {error ? (
    //     <div className="error-message">
    //       <p>{error}</p>
    //       <button onClick={() => navigate("/login")}>
    //         로그인 페이지로 돌아가기
    //       </button>
    //     </div>
    //   ) : (
    //     <div>네이버 로그인 처리 중...</div>
    //   )}
    // </div>
  );
};

export default NaverLoginCallback;