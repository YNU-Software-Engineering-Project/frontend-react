import MyfundingCard from 'components/myPage/myfundingCard';
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/myfunding.module.css'; 
import { useState, useEffect } from 'react';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { ShortFundingDataDto } from 'apiTypes/data-contracts';

function Myfunding() {
  const [todayAmount, setTodayAmount] = useState(0);
  const [todayLikes, setTodayLikes] = useState(0);
  const [fundingList, setFundingList] = useState<ShortFundingDataDto[]>([]);

  const api = new Api();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  useEffect(() => {
    handleShowMyFundingList();
  }, [page, size]);
  
  const handleShowMyFundingList = () => {
    const query = {
      page,
      size,
    };
    const params = Token.getHeaderParms;
    api
      .getMyFundingList(query, params)
      .then((response) => {
        //내 펀딩리스트 조회
        // console.log(response.data); //debug
        const { data=[], todayAmount=0, todayLikes=0 } = response.data;
        setFundingList(data);
        setTodayAmount(todayAmount);
        setTodayLikes(todayLikes);
        alert('내 펀딩리스트 조회');
      })
      .catch(error => {
        //내 펀딩리스트 조회 실패
        console.error('내 펀딩리스트 조회 실패:', error);
        if (error.response) {
          alert(`내 펀딩리스트 조회 실패: ${error.response.data.message}`);
        } else {
          alert('내 펀딩리스트 조회 실패: 네트워크 오류');
        }
      });
  };

    return (
        <div className={styles.myfunding_container}>
            <ProfileMenuBar />
            <div className={styles.myfunding_content}>
                <div className={styles.title}>내 펀딩</div>
                <div className={styles.myfunding_card}>
                    {/* <MyfundingCard /> */}
                    {/* {fundingList.map((funding) => (
            <MyfundingCard key={funding.fundingId} 
            title={funding.title ?? ''} 
            mainImage={funding.mainImage ?? ''} 
            state={funding.state ?? ''} 
            fundingId={funding.fundingId ?? 0} />
          ))} */}
          <MyfundingCard cards={fundingList} />
                </div>

                <div className={styles.myfunding_data}>
                    <div>오늘 데이터 한번에 보기</div>
                    <div className={styles.myfunding_data_content}>
                        <div className={styles.fund}>
                            <div>후원금</div>
                            <div>{todayAmount !== 0 ? `$${todayAmount.toLocaleString()}` : '-'}</div>
                        </div>
                        <div className={styles.like}>
                            <div>좋아요</div>
                            <div>{todayLikes !== 0 ? `${todayLikes.toLocaleString()}` : '-'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Myfunding;
