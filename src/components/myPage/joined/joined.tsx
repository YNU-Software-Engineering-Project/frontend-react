import { useState, useEffect } from 'react';
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import styles from 'styles/myPage/cardList.module.css';
import Pagination from 'components/myPage/Pagination';
import PostCard from 'components/common/PostCard';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { FundingDataDto } from 'apiTypes/data-contracts';

const Joined = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const [fundingData, setFundingData] = useState<FundingDataDto[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fundingDataEx = [
    {
      isExpired: false,
      avatarImgUrl: "A",
      postTitle: "펀딩제목 1",
      postSummary: "세부사항 1",
      postImgUrl: "https://sbart.or.kr/data/file/sub3_1/2041817992_rJAt25EV_ad9adce23e960e5a9d90e7c0c39e7eebcab87d4c.jpg",
      tagList: ["미술", "프로그램"],
      progressBarValue: 55,
    },
    {
      isExpired: true,
      avatarImgUrl: "B",
      postTitle: "펀딩제목 2",
      postSummary: "세부사항 2",
      postImgUrl: "https://si.kangwon.ac.kr/_res/knu/si/img/main/ti219a28512.jpg",
      tagList: ["과학", "기술"],
      progressBarValue: 75,
    },
    {
      isExpired: false,
      avatarImgUrl: "C",
      postTitle: "펀딩제목 3",
      postSummary: "세부사항 3",
      postImgUrl: "https://www.artinsight.co.kr/data/tmp/1910/20191027000540_kdckbikz.jpg",
      tagList: ["음악", "예술"],
      progressBarValue: 40,
    },
    {
      isExpired: true,
      avatarImgUrl: "D",
      postTitle: "펀딩제목 4",
      postSummary: "세부사항 4",
      postImgUrl: "https://kr.imboldn.com/wp-content/uploads/2022/07/newbie_guide_fitness_pt1_main.jpg",
      tagList: ["체육", "건강"],
      progressBarValue: 85,
    },
    {
      isExpired: false,
      avatarImgUrl: "E",
      postTitle: "펀딩제목 5",
      postSummary: "세부사항 5",
      postImgUrl: "https://velog.velcdn.com/images/yumjongeun/post/4f881634-b76d-443f-b724-b23eda68eb32/image.jpg",
      tagList: ["기술", "프로그래밍"],
      progressBarValue: 30,
    },
  ];

  const totalFundingCardsEx = fundingDataEx.length;
  const totalPagesEx = Math.ceil(totalFundingCardsEx / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  // const endIndexEx = Math.min(startIndex + cardsPerPage, totalFundingCardsEx);
  const endIndex = Math.min(startIndex + cardsPerPage, fundingData.length);

  const api = new Api();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  useEffect(() => {
    handleShowPledges();
  }, [page, size]);
  
  const handleShowPledges = () => {
    const query = {
      page,
      size,
    };
    const params = Token.getHeaderParms;
    api
      .getPledgeList(query, params)
      .then((response) => {
        //참여한 펀딩리스트 조회
        console.log(response);
        setFundingData(response.data.data ?? []);
        setTotalPages(response.data.totalPages ?? 0);
        alert('참여한 펀딩리스트 조회');
      })
      .catch(error => {
        //참여한 펀딩리스트 조회 실패
        console.error('참여한 펀딩리스트 조회 실패:', error);
        if (error.response) {
          alert(`참여한 펀딩리스트 조회 실패: ${error.response.data.message}`);
        } else {
          alert('참여한 펀딩리스트 조회 실패: 네트워크 오류');
        }
      });
  };

  return (
    <div className={styles.wishList_container}>
      <ProfileMenuBar />
      <div className={styles.wishList}>
        <div className={styles.wishList_title}>내가 참여한 펀딩</div>

        {fundingData.length === 0 ? (
          <div className={styles.empty_funding}>참여한 펀딩이 없습니다.</div>
        ) : (
        <div className={styles.funding_list_container}>
          <div className={styles.funding_card_list}>
            {/* {fundingDataEx.slice(startIndex, endIndexEx).map((funding, index) => (
              <PostCard key={index} {...funding} />
            ))} */}
            {fundingData.slice(startIndex, endIndex).map((funding, index) => (
              <PostCard key={funding.fundingId} {...funding} /> 
            ))}
          </div>

          <Pagination
            currentPage={currentPage} 
            // totalPages={totalPagesEx} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />

        </div>
        )}
      </div>
    </div>
  );
};

export default Joined;
