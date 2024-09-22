import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import './template.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="template">
      <div className="Header">
        <div className='Header_left'>메뉴</div>
        <div className='Header_center' onClick={() =>{navigate('');}}>SPARK+SEED</div>
        <div className='Header_right'>
          <div className='alarm_icon'><NotificationsNoneIcon /></div>
          <div className='profile_icon'><AccountCircleOutlinedIcon /></div>
          <div style={{
            borderLeft: '1px solid #000', 
            height: '20px',
            margin: '0 10px'
          }}></div>
          <div>등록하기</div>
        </div>
      </div>  
      <div className="Content">
        <Outlet />
      </div>  
      <div className="Footer">
        <div style={{height:30}}> </div>
        <div className='Footer_content'>

          <div className="Footer_top">
            <span>투자위험고지</span>
            <button className='service_button'>Term of Service</button>
          </div>

          <div className="Footer_bottom">
            <p>
              스타트업 투자는 원금 손실과 유동성 및 현금성에 대한 투자위험을 가지고 있습니다.<br />
              투자 전에 투자위험고지를 꼭 확인해주세요.<br />
              SparkSeed는 중개업(온라인소액투자중개 및 통신판매중개)을 영위하는 플랫폼 제공자로 자금을 모집하는<br /> 당사자가 아닙니다.
              따라서 투자손실의 위험을 보전하거나 상품 제공을 보장해 드리지 않으며 이에 대한 법적인<br /> 책임을 지지 않습니다.
            </p>
            <p className='Footer_bottom_right'>© 2024 Funding Platform.<br /> All rights reserved.</p>
          </div>
          <div style={{height:20}}> </div>

        </div>
      </div>  
    </div> 
  );
}

export default Home;