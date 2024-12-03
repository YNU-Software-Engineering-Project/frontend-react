import { useState } from 'react';
import styles from 'styles/login/Register.module.css';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { Api } from 'apiTypes/Api';
import { SignUpRequestDto } from 'apiTypes/data-contracts';
import naver from 'assets/naver.png';
import google from 'assets/google.png';
import kakao from 'assets/kakao.png';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const navigate = useNavigate();
  const api = new Api();

  const handleSignUP = async () => {
    if (!email || !password || !passwordConfirm || !phoneNumber) {
      alert('초대코드를 제외한 모든 필드를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const requestData: SignUpRequestDto = {
      email,
      password,
      passwordConfirm,
      phoneNumber,
      inviteCode: inviteCode === process.env.ADMIN_INVITE_CODE ? process.env.ADMIN_INVITE_CODE : '', //admin : user
    };

    api
      .signup(requestData)
      .then(response => {
        alert('회원가입 성공!');
        navigate('/login');
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
        if (error.response) {
          alert(`회원가입 실패: ${error.response.data.message}`);
        } else {
          alert('회원가입 실패: 네트워크 오류');
        }
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.register_container}>
        <div className={styles.email_text}>Email</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_email}
          type="text"
          placeholder="admin@naver.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.password_text}>Password</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_password}
          type="text"
          placeholder="value"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.confirmPassword_text}>Confirm Password</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_confirmPassword}
          type="text"
          placeholder="value"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.phoneNumber_text}>전화번호</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_phoneNumber}
          type="text"
          placeholder="010-3252-3131"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>
        <div className={styles.code_text}>초대 코드</div>
        <div style={{ height: 8 }}></div>
        <input
          className={styles.confirm_code}
          type="text"
          placeholder="value"
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
        ></input>
        <div style={{ height: 24 }}></div>

        <Button
          style={{ width: 272, height: 40, borderRadius: 2 }}
          onClick={handleSignUP}
        >
          Register
        </Button>
        <div style={{ height: 24 }}></div>

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
      </div>
    </div>
  );
}

export default Register;
