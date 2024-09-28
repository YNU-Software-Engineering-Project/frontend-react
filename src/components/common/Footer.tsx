import { useNavigate } from 'react-router-dom';
import styles from 'styles/common/Footer.module.css';

function Home() {
  const navigate = useNavigate();

  return (
      <div className={styles.Footer}>
        <div style={{height:30}}> </div>
        <div className={styles.Footer_content}>

          <div className={styles.Footer_top}>
            <span>투자위험고지</span>
            <button className={styles.service_button}>Term of Service</button>
          </div>

          <div className={styles.Footer_bottom}>
            <p>
              스타트업 투자는 원금 손실과 유동성 및 현금성에 대한 투자위험을 가지고 있습니다.<br />
              투자 전에 투자위험고지를 꼭 확인해주세요.<br />
              SparkSeed는 중개업(온라인소액투자중개 및 통신판매중개)을 영위하는 플랫폼 제공자로 자금을 모집하는<br /> 당사자가 아닙니다.
              따라서 투자손실의 위험을 보전하거나 상품 제공을 보장해 드리지 않으며 이에 대한 법적인<br /> 책임을 지지 않습니다.
            </p>
            <p className={styles.Footer_bottom_right}>© 2024 Funding Platform.<br /> All rights reserved.</p>
          </div>
          <div style={{height:20}}> </div>

        </div>
      </div>  
  );
}

export default Home;