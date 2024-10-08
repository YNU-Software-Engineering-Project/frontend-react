import MyfundingCard from 'components/myPage/myfundingCard';
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/myfunding.module.css'; 

function Myfunding() {
    const fund = [1000000];

    return (
        <div className={styles.myfunding_container}>
            <ProfileMenuBar />
            <div className={styles.myfunding_content}>
                <div className={styles.title}>내 펀딩</div>
                <div className={styles.myfunding_card}>
                    <MyfundingCard />
                </div>

                <div className={styles.myfunding_data}>
                    <div>오늘 데이터 한번에 보기</div>
                    <div className={styles.myfunding_data_content}>
                        <div className={styles.fund}>
                            <div>후원금</div>
                            <div>${fund.toLocaleString()}</div>
                        </div>
                        <div className={styles.like}>
                            <div>좋아요</div>
                            <div>-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myfunding;
