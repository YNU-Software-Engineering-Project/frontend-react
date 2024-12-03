import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MenuBar from 'components/adminPage/menuBar';
import PageManage from 'components/adminPage/pageManage';
import styles from 'styles/adminPage/MemberManage.module.css';
import { Admin } from 'apiTypes/Admin';
import { Token } from 'apiTypes/Token';
import { GetUserListResponseDto, UserDataDto } from 'apiTypes/data-contracts';

function MemberMange() {
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useState<Record<string, boolean>>({
    number: false,
    id: false,
    nickName: false,
    email: false,
    address: false,
    phone: false,
    date: false,
  });

  const handleToggle = (column: string) => {
    setToggle((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedMember, setSelectedMember] = useState<UserDataDto | null>(null);

  const closePopup = () => {
    setSelectedMember(null);
  };

  const [sort, setSort] = useState('latest');
  const [id, setId] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [userList, setUserList] = useState<UserDataDto[]>([]);
  const [userId, setUserId] = useState(0);
  const [role, setRole] = useState('USER'); /** 회원 상태 (USER: 일반 회원, SUSPENDED: 정지 회원) */

  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);
  
  const adminApi = new Admin();

  useEffect(() => {
    handleShowMembers();
  }, [sort, id, page, size]);

  const handleShowMembers = () => {
    const query ={
      sort,
      id,
      page,
      size,
    };
    const params = Token.getHeaderParms;
    adminApi.getUserList(query, params)
    .then((response) =>{
      if (response.data && response.data.data) {
        setUserList(response.data.data); 
      } else {
        setUserList([]);
      }
    })
    .catch((error)=>{
      //회원 명단 조회 실패
      console.error('회원 명단 조회 실패:', error);
      if (error.response) {
        alert(`회원 명단 조회 실패: ${error.response.data.message}`);
      } else {
        alert('회원조회 명단 실패: 네트워크 오류');
      }
    })
  };
//user 번호 누르면 정보 뜨게 하기
  const openPopup = (userId: number | undefined) => {
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    const params = Token.getHeaderParms;
    adminApi.getUserList1(userId, params)
    .then((response) =>{
      if (response.data && response.data.data) {
        setSelectedMember(response.data.data);
        // console.log('Selected Member:', response.data.data);
      } else {
        setUserList([]);
      }
    })
    .catch((error)=>{
      //회원 정보 조회 실패
      console.error('회원 정보 조회 실패:', error);
      if (error.response) {
        alert(`회원 정보 조회 실패: ${error.response.data.message}`);
      } else {
        alert('회원 정보 조회 실패: 네트워크 오류');
      }
    })
  };
//save버튼 누르면 저장되도록 - id는 선택한 값, 역할만 변경되게 ㄱ -> 정지회원이면 색깔 바꿔야겠다
  const handleChangeUser = () => {
    if (!selectedMember || !selectedMember.userId) {
      console.error('selectedMember User ID is undefined.');
      return;
    }
  
    console.log('userId:', selectedMember.userId);
    console.log('role:', role);
    const query = {
      role,
    };
    const params = Token.getHeaderParms;
    adminApi.changeUserState(selectedMember.userId, query, params)
    .then((response) => {
      alert('회원 상태 변경');
    })
    .catch((error) => {
      //회원 정보 수정 실패
      console.error('회원 정보 수정 실패:', error);
      if (error.response) {
        alert(`회원 정보 수정 실패: ${error.response.data.message}`);
      } else {
        alert('회원 정보 수정 실패: 네트워크 오류');
      }
    })
  };

  return (
    <div className={styles.admin_container}>
      <MenuBar />

      <div className={styles.customer_management_content}> 
        <div className={styles.searchWrapper}>
          <div className={styles.search}>
              <input className={styles.search_input} type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
              <SearchIcon className={styles.search_icon}/>
          </div>
        </div>
        <div className={styles.horizontal_line_CAC4D0}></div>
        <div className={styles.member_status}>
            <div className={styles.member_status_bar}>
                <div className={styles.number} onClick={() => handleToggle('number')}>NO 
                  {toggle.number ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.id} onClick={() => handleToggle('id')}>ID
                {toggle.id ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.nickName} onClick={() => handleToggle('nickName')}>닉네임
                {toggle.nickName ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.email} onClick={() => handleToggle('email')}>학교 이메일
                {toggle.email ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.address} onClick={() => handleToggle('address')}>주소
                {toggle.address ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.phone} onClick={() => handleToggle('phone')}>전화번호
                {toggle.phone ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
                <div className={styles.date} onClick={() => handleToggle('date')}>가입일
                {toggle.date ? <KeyboardArrowUpOutlinedIcon fontSize='small'/> : <KeyboardArrowDownOutlinedIcon fontSize='small'/>}
                </div>
            </div>
            <div className={styles.member_status_content}>
              {userList.map((item) => (
                <div className={styles.member_row} key={item.userId} style={{ cursor: 'pointer' }}>
                  {/* 검색시 검색한 아이디만 보이게 수정 필요 */}
                  <div className={styles.number} onClick={() => openPopup(item.userId)}>{item.no}</div>
                  <div className={styles.id}>{item.id}</div>
                  <div className={styles.nickName}>{item.nickname}</div>
                  <div className={styles.email}>{item.schoolEmail}</div>
                  <div className={styles.address}>{item.address}</div>
                  <div className={styles.phone}>{item.phoneNumber}</div>
                  <div className={styles.date}>{item.createdAt}</div>
                </div>
              ))}
            </div>
        </div>
        <div className={styles.page_manage}>
          <PageManage 
            totalUsers={userList.length} 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
          />
        </div>
      </div>
      
      {selectedMember && (
      <div className={styles.userState_popup}>
        <div className={styles.userState_popup_top}>
            <div>회원 정보 수정</div>
            <div className={styles.cancel} onClick={closePopup}>X</div>
        </div>
        <div className={styles.userState_popup_content}>
            <div>ID</div>
            <input defaultValue={selectedMember.id}></input>
            <div>닉네임</div>
            <input defaultValue={selectedMember.nickname}></input>
            <div>학교 이메일</div>
            <input defaultValue={selectedMember.schoolEmail}></input>
            <div>전화번호</div>
            <input defaultValue={selectedMember.phoneNumber}></input>
            <div>비밀번호 변경</div>
            <input type='text' placeholder='Value'></input>
            <div>주소</div>
            <input defaultValue={selectedMember.address}></input>
            {/* <div className={styles.member_statue}>normal/정지회원</div> */}
            <div className={styles.member_statue}>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="USER">normal</option>
                <option value="SUSPENDED">정지회원</option>
              </select>
            </div>
        </div>
        <div className={styles.userState_popup_bottom}>
            <button className={styles.cancel_button} onClick={closePopup}>cancel</button>
            <button className={styles.save_button} onClick={() => handleChangeUser}>save</button>
        </div>
      </div>
      )}
    </div>    
  );
}

export default MemberMange;
