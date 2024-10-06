import styles from "styles/CreatePage/section/schedule.module.css";

const Schedule =()=>{
    return <>
    <div className={styles.wrapper}>
        <p style={{fontSize:'24px'}}>일정</p>
        <p style={{fontSize:'16px', fontWeight:'lighter'}}>심사가 완료되면 프로젝트 일정을 설정할 수 있어요. 프로젝트를 제출하고 일정을 관리해 보세요.</p>
        <div className={styles.content}>
            <p className={styles.subTitle}>1. 프로젝트 제출</p>
            <p className={styles.text}>[정책] 메뉴를 모두 작성하면 제출할 수 있어요.<br/></p>
            <p className={styles.subTitle}>2. 프로젝트 심사</p>
            <p className={styles.text}> 제품을 유통할 수 있는지, 스토리에 작성한 내용이 적합한지 확인이 진행돼요. <br/>
                프로젝트는 최소 7일에서 최대 60일까지 진행할 수 있어요.<br/></p>
            <p className={styles.subTitle}>3. 선정산 예정</p>
            <p className={styles.text}> 선정산금은 결제가 완료되고 정산 내역서가 발송되면 5영업일 이내에 받을 수 있어요. <br/></p>
            <p className={styles.subTitle}>4. 리워드 발송 기간 </p>
            <p className={styles.text}>결제가 모두 완료되면 발송에 필요한 서포터 정보를 확인할 수 있고 리워드를 발송할 수 있어요.<br/>
                선택한 발송 기간 내에 리워드를 발송하고 발송 정보를 입력해야 돼요.<br/>
                 리워드 발송이 지연되거나, 발송한 리워드에 하자 이슈가 있는 경우에는 환불이 접수될 수 있어요.<br/></p>
            <p className={styles.subTitle}>5. 최종정산 예정</p>
            <p className={styles.text}>리워드 발송 완료 및 환불 처리가 모두 완료되면 최종 정산금을 받을 수 있어요. <br/>
                최종 정산금에는 SparkSeed의 요금제가 포함됩니다.</p>
        </div>
    </div>
    </>
};

export default Schedule;