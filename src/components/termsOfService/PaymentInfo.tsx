import styles from "styles/termsOfService/paymentInfo.module.css";
import paymentImg from "assets/payment.png";

function PaymentInfo() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>SparkSeed에서 제공하는 요금제는 하나입니다.</div>
            <img src={paymentImg} alt="image" />
            <div className={styles.small}>SparkSeed 서비스 목적과 비전을 위해서 결정된 요금제입니다. 불필요한 마케팅 비용을 모두 제거하고 필요한 기능만 담아 모든 학생들이 차별받지 않고 펀딩으로 얻은 수익금의 많은 부분을 가져갈 수 있도록 설계되었습니다.
            </div>
        </div>
    );
}

export default PaymentInfo ;
  