import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/mypage.module.css'; 
import { useState } from 'react';
import Button from 'components/common/Button';

function Mypage() {
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [roadAddress, setRoadAddress] = useState('');
  const [jibunAddress, setJibunAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');

  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: { zonecode: string; roadAddress: string; jibunAddress: string }) => {
        setPostalCode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress);
      }
    }).open();
  };

  return (
    <div className={styles.mypage_container}>

      <ProfileMenuBar />

      <div className={styles.my_profile}>
        <div className={styles.my_profile_img_container}>
          <div className={styles.my_profile_img}></div>
          <div className={styles.my_profile_img_button}>
            <Button style={{ width: 112, height: 40, borderRadius: 2}}>바꾸기</Button>
            <Button style={{ width: 112, height: 40, borderRadius: 2}}
            type='white'>삭제</Button>
          </div>
        </div>
        <div className={styles.my_profile_change_container}>
          <div>닉네임</div>
          <input className={styles.my_profile_change_input} value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
        </div>
        <div className={styles.my_profile_change_container}>
          <div>아이디</div>
          <input className={styles.my_profile_change_input} value={userId} onChange={(e) => setUserId(e.target.value)}></input>
        </div>
        <div className={styles.pw_change_container}>
          <div className={styles.my_profile_change_container}>
            <div>비밀번호 변경</div>
            <input className={styles.my_profile_change_input} value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div className={styles.my_profile_change_container}>
            <div>비밀번호 확인</div>
            <input className={styles.my_profile_change_input} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
          </div>
        </div>
        <div className={styles.phone_number_change_container}>
          <div className={styles.my_profile_change_container}>
            <div>전화번호</div>
            <input className={styles.my_profile_change_input} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></input>
          </div>
          <Button style={{ width: 117, height: 40, borderRadius: 2, marginLeft:7.5, marginTop:3.5}}>수정하기</Button>
          
        </div>
        <div className={styles.school_email_change_container}>
          <div className={styles.my_profile_change_container}>
            <div>학교 이메일</div>
            <input className={styles.my_profile_change_input} value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)}></input>
          </div>
          <Button style={{ width: 117, height: 40, borderRadius: 2, marginLeft:7.5, marginTop:3.5}}>확인</Button>
        </div>
        <div className={styles.adress_change_container}>
          <div className={styles.my_profile_address_change_container}>
            <div>주소</div>
            <input className={styles.my_profile_change_input} type='text' placeholder='우편번호' value={postalCode}></input>
          </div>
          <Button style={{ width: 117, height: 40, borderRadius: 2, marginLeft:7.5, marginTop:3.5}}
          onClick={openPostcode}>우편번호 찾기</Button>
        </div>
        <div className={styles.address}>
          <input className={styles.my_profile_change_input} type='text' placeholder='도로명 주소' value={roadAddress}></input>
          <input className={styles.my_profile_change_input} type='text' placeholder='지번 주소' value={jibunAddress}></input>
        </div>
        <input className={styles.detail_address} type='text' placeholder='상세주소' value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)}></input>
        <div className={styles.save_button_container}>
          <Button style={{ width: 272, height: 40, borderRadius: 2,}}>submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
