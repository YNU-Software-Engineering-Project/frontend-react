import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/mypage.module.css'; 
import { useState, useEffect } from 'react';
import Button from 'components/common/Button';
import { Api } from 'apiTypes/Api';
import { GetUserProfileResponseDto, EmailSendTokenRequestDto, ModifyProfilePayload, PatchPhoneNumberRequestDto } from 'apiTypes/data-contracts';
import { Token } from 'apiTypes/Token';
import { AxiosResponse } from 'axios';
import defaultProfileImage from 'assets/purple-circle.png';
import { FileApi } from 'apiTypes/File';

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
  const [detailAddress, setDetailAddress] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const api = new Api();
  const fileApi = new FileApi();

  useEffect(() => {
    handleGetUser();
  }, []);

  const openPostcode = () => { //주소 입력
    new window.daum.Postcode({
      oncomplete: (data: { zonecode: string; roadAddress: string; jibunAddress: string }) => {
        setPostalCode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress);
      }
    }).open();
  };
  const handleGetUser = () => { //마이페이지 정보 가져오기
    const params = Token.getHeaderParms;
    console.log(params);

    api.getUserProfile(params)
    .then((response: AxiosResponse<GetUserProfileResponseDto>)=>{
      if (response.data && response.data.data) {
        // 로그인되어 있을 경우, 마이페이지 정보 가져오기
        const userData = response.data.data;
        const fileName = userData.profileImage || defaultProfileImage; 
        const fileType = userData.profileImage?.endsWith('.png') ? 'image/png' : 'image/jpeg';

        // 상태 설정
        if (userData.profileImage) {
          fileApi.getImage(userData.profileImage)
            .then(imageResponse => {
              const file = new File([imageResponse.data], fileName, {
                type: fileType, 
              });
              setProfileImage(file);
            })
            .catch(error => {
              console.error('이미지 로드 실패:', error);
            });
        }
        // setProfileImage(userData.profileImage ? new File([], userData.profileImage) : null);
        setNickname(userData.nickname || ''); 
        setUserId(userData.id || ''); 
        setPhoneNumber(userData.phoneNumber || ''); 
        setSchoolEmail(userData.schoolEmail || ''); 
        setPostalCode(userData.postalCode || ''); 
        setRoadAddress(userData.roadAddress || ''); 
        setJibunAddress(userData.landLotAddress || ''); 
        setDetailAddress(userData.detailAddress || ''); 
      } else {
        alert('사용자 정보를 찾을 수 없습니다.');
      }
    })
    .catch(error=>{
      // 로그인되어 있지 않을 경우
      console.error('로그인 필요:', error);
        if (error.response) {
          alert(`로그인 필요: ${error.response.data.message}`);
        } else {
          alert('로그인 필요: 네트워크 오류');
        }
    });
    
  };

  const handleChangeProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => { //이미지 변경; 바꾸기 버튼 누를 시
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setProfileImage(file); // Set the selected file to state
    }
  };

  const handleDeleteProfileImage = () => { //이미지 초기화; 삭제 버튼 누를 시
    if (profileImage) {
      const fileName = profileImage.name;

      fileApi.deleteImage(fileName)
        .then(() => {
          alert('프로필 이미지가 삭제되었습니다.');
          setProfileImage(null);
        })
        .catch(error => {
          console.error('이미지 삭제 실패:', error);
          if (error.response) {
            alert(`이미지 삭제 실패: ${error.response.data.message}`);
          } else {
            alert('이미지 삭제 실패: 네트워크 오류');
          }
        });
    }
  };

  const handleMypage = () => { //마이페이지 수정; susbit버튼 누를 시
    const formData = new FormData();
    // if (profileImage) {
    //   formData.append('profileImage', profileImage);
    // }
    const profileImageString = profileImage ? profileImage : undefined;
    const requestData: ModifyProfilePayload = {
      // profileImage: profileImage ?? undefined,
      profileImage: profileImageString,  
      userInfo: {
        nickname,
        password,
        confirmPassword,
        postalCode,
        roadAddress,
        landLotAddress: jibunAddress,
        detailAddress,
      }
    };
    const params = Token.getHeaderParms;
    api
      .modifyProfile(requestData, params)
      .then((response) => {
        //프로필 수정
        alert('프로필 수정 완료');
      })
      .catch(error => {
        //프로필 수정 실패
        console.error('프로필 수정 실패:', error);
        if (error.response) {
          alert(`프로필 수정 실패: ${error.response.data.message}`);
        } else {
          alert('프로필 수정 실패: 네트워크 오류');
        }
      });
  };

  const handleShoolEmailCheck = () => { //학교 이메일 인증; 이메일 확인 버튼 누를 시
    const requestData: EmailSendTokenRequestDto = {
      email: schoolEmail,
    };
    const params = Token.getHeaderParms;
    api
      .sendEmailToken(requestData, params)
      .then((response) => {
        //학교메일 인증
        alert('인증 이메일이 발송되었습니다. 이메일을 확인해 주세요.');
      })
      .catch(error => {
        //학교메일 인증 실패
        console.error('학교메일 인증 실패:', error);
        if (error.response) {
          alert(`학교메일 인증 실패: ${error.response.data.message}`);
        } else {
          alert('학교메일 인증 실패: 네트워크 오류');
        }
      });
  };

  const handlePhoneNumberChange = () => { //전화번호 변경; 전화번호 수정 버튼 누를 시
    const requestData: PatchPhoneNumberRequestDto = {
      phoneNumber,
    };
    const params = Token.getHeaderParms;
    api
      .modifyPhoneNumber(requestData, params)
      .then((response) => {
        //전화번호 변경
        alert('전화번호가 변경되었습니다.');
      })
      .catch(error => {
        //전화번호 변경 실패
        console.error('전화번호 변경 실패:', error);
        if (error.response) {
          alert(`전화번호 변경 실패: ${error.response.data.message}`);
        } else {
          alert('전화번호 변경 실패: 네트워크 오류');
        }
      });
  };

  return (
    <div className={styles.mypage_container}>

      <ProfileMenuBar />

      <div className={styles.my_profile}>
        <div className={styles.my_profile_img_container}>
          <div className={styles.my_profile_img}>
            <img src={profileImage ? URL.createObjectURL(profileImage) : defaultProfileImage} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}/>
          </div>
          <div className={styles.my_profile_img_button}>
            <Button style={{ width: 112, height: 40, borderRadius: 2}}
            onClick={() => document.getElementById('fileInput')?.click()}>바꾸기</Button>
            <input 
            id="fileInput" 
            type="file" 
            accept="image/png, image/jpeg" 
            style={{ display: 'none' }} // Hide the file input
            onChange={handleChangeProfileImage} 
          />
            <Button style={{ width: 112, height: 40, borderRadius: 2}}
            type='white' onClick={handleDeleteProfileImage}>삭제</Button>
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
          <Button style={{ width: 117, height: 40, borderRadius: 2, marginLeft:7.5, marginTop:3.5}}
          onClick={handlePhoneNumberChange}>수정하기</Button>
          
        </div>
        <div className={styles.school_email_change_container}>
          <div className={styles.my_profile_change_container}>
            <div>학교 이메일</div>
            <input className={styles.my_profile_change_input} value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)}></input>
          </div>
          <Button style={{ width: 117, height: 40, borderRadius: 2, marginLeft:7.5, marginTop:3.5}}
          onClick={handleShoolEmailCheck}>확인</Button>
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
        <input className={styles.detail_address} type='text' placeholder='상세주소' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)}></input>
        <div className={styles.save_button_container}>
          <Button style={{ width: 272, height: 40, borderRadius: 2,}} onClick={handleMypage}>submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
