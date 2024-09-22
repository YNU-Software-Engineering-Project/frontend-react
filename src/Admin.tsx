import React from 'react';
import './Admin.css';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts';
import { useSpring, animated } from '@react-spring/web';


function App() {
  const successFundingValue = 50;
  const fundingStatus = [
    {label: '성공', value:successFundingValue, color:'#1BD9C9', id:0},
    {label: '미달', value:15, color:'#1CBFB2', id:1},
    {label: '진행', value:35, color:'#14958B', id:2},
  ];
  const data = fundingStatus.map((status) => ({
    label: status.label,
    value: status.value,
    color: status.color,
    id: status.id,
  }));
  const { innerRadius, outerRadius, paddingAngle, cornerRadius, startAngle, endAngle } = useSpring({
    innerRadius: 100, // 초기 값
    outerRadius: 150, // 초기 값
    paddingAngle: 0,
    cornerRadius: 0,
    startAngle: 0,
    endAngle: 360,
  });


  return (
    <div className='admin_container'>
      <div className='menu_bar'>
        <div className='menu_bar_top'>관리자 로그인 상태</div>
        <div className='horizontal_line_CAC4D0'></div>
        <div>summary</div>
        <div className='horizontal_line'></div>
        <div><Link to="/membermange">회원관리</Link></div>
        <div className='horizontal_line'></div>
        <div><Link to="/postmanage">게시물 관리</Link></div>
        <div className='horizontal_line'></div>
        <div><Link to="/chat">채팅</Link></div>
        <div className='horizontal_line'></div>
      </div>

      <div className='summary_content'> 
        <div className='customer_management'>
          <div className='title'>회원</div> <div className="vertical_line"></div>
          
          <div className='customer_management_component'>
            <div className='customer_management_top'>
              <div className='customer_management_container'>
                <div>총 회원수</div> 
                <div>-</div> 
              </div>
              <hr />
              <div className='customer_management_container'>
                <div>오늘 가입자 수</div> 
                <div>-</div> 
              </div>
              <hr />
            </div>
            <div className='customer_management_bottom'>
              <div className='customer_management_container'>
                <div>일인당 찜 개수</div> 
                <div>-</div> 
              </div>
              <hr />
              <div className='customer_management_container'>
                <div>일인당 평균 펀딩 금액</div> 
                <div>-</div> 
              </div>
              <hr />
            </div>
          </div>
        </div>

        <div className='funding_status'>
          <div className='title'>펀딩</div> <div className="vertical_line"></div>
          <div className='funding_status_component'>
            <div className='funding_status_top'>
              <div className='funding_status_container'>
                    <div>전체 펀딩 수</div> 
                    <div>-</div> 
              </div>
              <hr />
              <div className='funding_status_container'>
                    <div>종료된 펀딩</div> 
                    <div>-</div> 
              </div>
              <hr />
            </div>

            <div className='chart'>
              {/* <PieChart width={330} height={330}>
                <Pie
                  data={fundingStatus}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={100}
                  outerRadius={150}
                  cx={150}
                  cy={145}
                />
                <text
                  x={150}  
                  y={145}  
                  textAnchor="middle"  
                  dominantBaseline="middle"  
                  fontSize="20"  
                  fontWeight="bold"  
                >
                  펀딩성공률
                  <tspan x="150" dy="20">
                    {`${successFundingValue}%`}
                  </tspan>
                </text>
                <Tooltip />
              </PieChart> */}
              <PieChart width={330} height={330} series={[
                { 
                  data: data,
                  innerRadius: 100,
                  outerRadius: 150,
                  paddingAngle: 0,
                  cornerRadius: 0,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                }
                ]}>
          <text
            x={150}
            y={150}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="bold"
          >
            펀딩성공률
            <tspan x="150" dy="20">
              {`${successFundingValue}%`}
            </tspan>
          </text>
          {/* <ChartsTooltip /> */}
        </PieChart>
            </div>
            
            <div className='funding_status_bottom'>
              <div className='funding_status_container'>
                <div className='funding_success'>성공 펀딩 수</div>  
                <div>-</div> 
              </div>
              <hr />
              <div className='funding_status_container'>
                <div className='funding_fail'>미달 펀딩 수</div> 
                <div>-</div> 
              </div>
              <hr />
              <div className='funding_status_container'>
                <div className='funding_running'>진행 중인 펀딩 수</div>
                <div>-</div> 
              </div>
              <hr />
            </div>
          </div>
          
        </div>
      </div>
    </div>    
  );
}

export default App;
