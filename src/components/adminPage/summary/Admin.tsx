import styles from 'styles/adminPage/Admin.module.css';
import { PieChart } from '@mui/x-charts';
import { useSpring } from '@react-spring/web';
import MenuBar from 'components/adminPage/menuBar';
import { Admin } from 'apiTypes/Admin';
import { Token } from 'apiTypes/Token';
import { GetAdminSummaryData } from 'apiTypes/data-contracts';
import { useState, useEffect } from 'react';

function Summary() {
  const successFundingValue = 50;
  const fundingStatus = [
    { label: '성공', value: successFundingValue, color: '#1BD9C9', id: 0 },
    { label: '미달', value: 15, color: '#1CBFB2', id: 1 },
    { label: '진행', value: 35, color: '#14958B', id: 2 },
  ];
  
  const data = fundingStatus.map((status) => ({
    label: status.label,
    value: status.value,
    color: status.color,
    id: status.id,
  }));

  const { innerRadius, outerRadius } = useSpring({
    innerRadius: 100,
    outerRadius: 150, 
  });
//getAdminSummary - 나눠서 출력(회원이랑 펀딩이랑/둘 다 있기 때문에)
  const adminApi = new Admin();
  const [adminSummary, setAdminSummary] = useState<GetAdminSummaryData | null>(null);
  
  useEffect(() => {
    handleAdminSummary();
  }, []);

  const handleAdminSummary = () => {
    adminApi.getAdminSummary()
    .then(response => {
      setAdminSummary(response.data);
    })
    .catch(error => {
      //요약본 조회 실패
      console.error("요약본 조회 실패:",error);
      if(error.response){
        alert(`요약본 조회 실패: ${error.response}`);
      }
      else{alert(`요약본 조회 실패: 네트워크 오류`)}
    })
  }

  return (
    <div className={styles.admin_container}>
      <MenuBar />
      <div className={styles.summary_content}> 
        <div className={styles.customer_management}>
          <div className={styles.title}>회원</div> 
          <div className={styles.vertical_line}></div>
          
          <div className={styles.customer_management_component}>
            <div className={styles.customer_management_top}>
              <div className={styles.customer_management_container}>
                <div>총 회원수</div> 
                <div>{adminSummary?.totalUsers || '-'}</div> 
              </div>
              <hr />
              <div className={styles.customer_management_container}>
                <div>오늘 가입자 수</div> 
                <div>{adminSummary?.todayUsers || '-'}</div> 
              </div>
              <hr />
            </div>
            <div className={styles.customer_management_bottom}>
              <div className={styles.customer_management_container}>
                <div>일인당 찜 개수</div> 
                <div>{adminSummary?.averageFundingLikes || '-'}</div> 
              </div>
              <hr />
              <div className={styles.customer_management_container}>
                <div>일인당 평균 펀딩 금액</div> 
                <div>{adminSummary?.averageFundingAmount?.toLocaleString() || '-'}</div> 
              </div>
              <hr />
            </div>
          </div>
        </div>

        <div className={styles.funding_status}>
          <div className={styles.title}>펀딩</div> 
          <div className={styles.vertical_line}></div>
          <div className={styles.funding_status_component}>
            <div className={styles.funding_status_top}>
              <div className={styles.funding_status_container}>
                <div>전체 펀딩 수</div> 
                <div>{adminSummary?.totalFundings || '-'}</div> 
              </div>
              <hr />
              <div className={styles.funding_status_container}>
                <div>종료된 펀딩</div> 
                <div>{adminSummary?.closedFundings || '-'}</div> 
              </div>
              <hr />
            </div>

            <div className={styles.chart}>
              <PieChart 
                width={400} 
                height={330} 
                series={[
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
                    highlightScope: { fade: 'global', highlight: 'item' },
                    faded: { innerRadius: 80, additionalRadius: -30, color: 'gray' },
                  }
                ]}
              >
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
                    {`${adminSummary?.successRate || '0'}%`}
                  </tspan>
                </text>
              </PieChart>
            </div>

            <div className={styles.funding_status_bottom}>
              <div className={styles.funding_status_container}>
                <div className={styles.funding_success}>성공 펀딩 수</div>  
                <div>{adminSummary?.successfulFundings || '-'}</div> 
              </div>
              <hr />
              <div className={styles.funding_status_container}>
                <div className={styles.funding_fail}>미달 펀딩 수</div> 
                <div>{adminSummary?.failedFundings || '-'}</div> 
              </div>
              <hr />
              <div className={styles.funding_status_container}>
                <div className={styles.funding_running}>진행 중인 펀딩 수</div>
                <div>{adminSummary?.ongoingFundings || '-'}</div> 
              </div>
              <hr />
            </div>
          </div>
          
        </div>
      </div>
    </div>    
  );
}

export default Summary;
