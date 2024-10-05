import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/mypage.module.css'; 
import { useState } from 'react';

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
            <button className={styles.img_change_button}>바꾸기</button>
            <button className={styles.img_del_button}>삭제</button>
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
          <button className={styles.my_profile_button}>수정하기</button>
        </div>
        <div className={styles.school_email_change_container}>
          <div className={styles.my_profile_change_container}>
            <div>학교 이메일</div>
            <input className={styles.my_profile_change_input} value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)}></input>
          </div>
          <button className={styles.my_profile_button}>확인</button>
        </div>
        <div className={styles.adress_change_container}>
          <div className={styles.my_profile_address_change_container}>
            <div>주소</div>
            <input className={styles.my_profile_change_input} type='text' placeholder='우편번호' value={postalCode}></input>
          </div>
          <button className={styles.my_profile_button} onClick={openPostcode}>우편번호 찾기</button>
        </div>
        <div className={styles.address}>
          <input className={styles.my_profile_change_input} type='text' placeholder='도로명 주소' value={roadAddress}></input>
          <input className={styles.my_profile_change_input} type='text' placeholder='지번 주소' value={jibunAddress}></input>
        </div>
        <input className={styles.detail_address} type='text' placeholder='상세주소' value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)}></input>
        <div className={styles.save_button_container}><button className={styles.save_button}>submit</button></div>
      </div>
    </div>
  );
}

export default Mypage;
