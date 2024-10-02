import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import MenuBar from 'components/adminPage/menuBar';
import PageManage from 'components/adminPage/pageManage';
import styles from 'styles/adminPage/MemberManage.module.css';

type Member = {
  number: number;
  id: string;
  nickName: string;
  email: string;
  address: string;
  phone: string;
  date: string;
};

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
  const data = [
    { number: 1, id: 'admin', nickName: "spending", email: 'spending@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4545', date: '2024-08-01' },
    { number: 2, id: 'admin2', nickName: "spending2", email: 'spending2@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4546', date: '2024-08-01' },
    { number: 3, id: 'admin3', nickName: "spending3", email: 'spending3@yu.ac.kr', address: '대구광역시 달서구', phone: '010-2914-4547', date: '2024-08-01' },
    { number: 4, id: 'admin4', nickName: "spending4", email: 'spending4@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4548', date: '2024-08-02' },
    { number: 5, id: 'admin5', nickName: "spending5", email: 'spending5@yu.ac.kr', address: '대구광역시 달서구', phone: '010-2914-4549', date: '2024-08-03' },
    { number: 6, id: 'admin6', nickName: "spending6", email: 'spending6@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4550', date: '2024-08-04' },
    { number: 7, id: 'admin7', nickName: "spending7", email: 'spending7@yu.ac.kr', address: '대구광역시 달서구', phone: '010-2914-4551', date: '2024-08-05' },
    { number: 8, id: 'admin8', nickName: "spending8", email: 'spending8@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4552', date: '2024-08-06' },
    { number: 9, id: 'admin9', nickName: "spending9", email: 'spending9@yu.ac.kr', address: '대구광역시 달서구', phone: '010-2914-4553', date: '2024-08-07' },
    { number: 10, id: 'admin10', nickName: "spending10", email: 'spending10@yu.ac.kr', address: '대구광역시 달서구 조암로6길 월성푸르지오 스포츠센터', phone: '010-2914-4554', date: '2024-08-08' },
    { number: 11, id: 'admin11', nickName: "spending11", email: 'spending11@yu.ac.kr', address: '대구광역시 달서구', phone: '010-2914-4555', date: '2024-08-09' },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const openPopup = (member: Member) => {
    setSelectedMember(member);
  };

  const closePopup = () => {
    setSelectedMember(null);
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
              {currentItems.map((item) => (
                <div className={styles.member_row} key={item.number} onClick={() => openPopup(item)}>
                    <div className={styles.number}>{item.number}</div>
                    <div className={styles.id}>{item.id}</div>
                    <div className={styles.nickName}>{item.nickName}</div>
                    <div className={styles.email}>{item.email}</div>
                    <div className={styles.address}>{item.address}</div>
                    <div className={styles.phone}>{item.phone}</div>
                    <div className={styles.date}>{item.date}</div>
                </div>
              ))}
            </div>
        </div>
        <div className={styles.page_manage}>
          <PageManage 
            totalUsers={data.length} 
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
            <input defaultValue={selectedMember.nickName}></input>
            <div>학교 이메일</div>
            <input defaultValue={selectedMember.email}></input>
            <div>전화번호</div>
            <input defaultValue={selectedMember.phone}></input>
            <div>비밀번호 변경</div>
            <input type='text' placeholder='Value'></input>
            <div>주소</div>
            <input defaultValue={selectedMember.address}></input>
            <div className={styles.member_statue}>normal/정지회원</div>
        </div>
        <div className={styles.userState_popup_bottom}>
            <button className={styles.cancel_button} onClick={closePopup}>cancel</button>
            <button className={styles.save_button}>save</button>
        </div>
      </div>
      )}
    </div>    
  );
}

export default MemberMange;
