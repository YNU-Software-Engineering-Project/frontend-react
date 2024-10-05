import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomProgressBar from 'components/myPage/chart';
import styles from 'styles/myPage/fundingCard.module.css';

interface FundingCardProps {
  done: boolean;
  user: string;
  title: string;
  detail: string;
  fundingImage: string;
  categories: string[];
  fundingRatioValue: number;
}

const FundingCard: React.FC<FundingCardProps> = ({
  done,
  user,
  title,
  detail,
  fundingImage,
  categories,
  fundingRatioValue
}) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className={`${styles.funding_card} ${done ? styles.blur : ''}`}>
      {done && (
        <div className={styles.done_overlay}>
          <span className={styles.done_message}>종료되었습니다</span>
        </div>
      )}
      <div className={styles.funding_card_top}>
        <div className={styles.funding_card_top_img}>{user}</div>
        <div className={styles.funding_title}>{title}</div>
      </div>
      <div className={styles.funding_img}>{fundingImage}</div>
      <div className={styles.funding_content}>
        <div className={styles.funding_title}>{title}</div>
        <div className={styles.funding_detail}>{detail}</div>
        <div className={styles.funding_chart}><CustomProgressBar value={fundingRatioValue} /></div>
        <div className={styles.category}>
          {categories.map((category, index) => (
            <div key={index} className={`category${index + 1}`}>{category}</div>
          ))}
        </div>
        <div className={styles.funding_menu}>
          <button className={styles.like_button} onClick={handleLike}>
            {like ? '좋아요 ' : '좋아요 '}
            {like ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
          </button>
          <button className={styles.fund_button}>후원하러 가기</button>
        </div>
      </div>
    </div>
  );
}

export default FundingCard;
