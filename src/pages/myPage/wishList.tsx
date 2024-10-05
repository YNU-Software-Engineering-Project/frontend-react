import { useState } from 'react';
import ProfileMenuBar from 'components/myPage/profileMenuBar';
import FundingCard from 'components/myPage/fundingCard';
import styles from 'styles/myPage/cardList.module.css';
import Pagination from 'components/myPage/Pagination';

const WishList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const fundingData = [
    {
      done: false,
      user: "A",
      title: "펀딩제목 1",
      detail: "세부사항 1",
      fundingImage: "funding_image",
      categories: ["미술", "프로그램"],
      fundingRatioValue: 55,
    },
    {
      done: false,
      user: "B",
      title: "펀딩제목 2",
      detail: "세부사항 2",
      fundingImage: "funding_image",
      categories: ["과학", "기술"],
      fundingRatioValue: 75,
    },
    {
      done: false,
      user: "C",
      title: "펀딩제목 3",
      detail: "세부사항 3",
      fundingImage: "funding_image_3",
      categories: ["음악", "예술"],
      fundingRatioValue: 40,
    },
    {
      done: false,
      user: "D",
      title: "펀딩제목 4",
      detail: "세부사항 4",
      fundingImage: "funding_image_4",
      categories: ["체육", "건강"],
      fundingRatioValue: 85,
    },
    {
      done: false,
      user: "E",
      title: "펀딩제목 5",
      detail: "세부사항 5",
      fundingImage: "funding_image_5",
      categories: ["기술", "프로그래밍"],
      fundingRatioValue: 30,
    },
  ];

  const totalFundingCards = fundingData.length;
  const totalPages = Math.ceil(totalFundingCards / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalFundingCards);

  return (
    <div className={styles.wishList_container}>
      <ProfileMenuBar />
      <div className={styles.wishList}>
        <div className={styles.wishList_title}>내가 관심있는 상품들</div>
        <div className={styles.funding_list_container}>
          <div className={styles.funding_card_list}>
            {fundingData.slice(startIndex, endIndex).map((funding, index) => (
              <FundingCard key={index} {...funding} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />

        </div>
      </div>
    </div>
  );
};

export default WishList;
