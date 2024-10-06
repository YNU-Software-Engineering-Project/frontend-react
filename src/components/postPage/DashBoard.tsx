import style from 'styles/PostPage/DashBoard.module.css';
import PieChart from 'components/common/PieChart';
import SponsorList from './dashBoard/SponsorList';

const DashBoard = () => {
  const data = {
    chartTodayHeart: [
      { id: 0, value: 2, label: '오늘 하트', color: '#29b6f6' }, // 오늘 찜수 비율을 나타내는 색
      {
        id: 1,
        value: 10,
        label: '오늘 방문자 - 오늘 하트',
        color: '#c8e6c9',
      }, // 나머지 방문자 수 비율을 나타내는 색
    ],
    chartTotalHeart: [
      { id: 0, value: 10, label: '총 하트', color: '#4db6ac' }, // 오늘 찜수 비율을 나타내는 색
      {
        id: 1,
        value: 100 - 10,
        label: '총 방문자수 - 총 하트',
        color: '#b2dfdb',
      }, // 나머지 방문자 수 비율을 나타내는 색
    ],
    chartTodayFund: [
      { id: 0, value: 300000, label: '오늘 금액', color: '#ffb74d' }, // 오늘 찜수 비율을 나타내는 색
      {
        id: 1,
        value: 10000000 - 300000,
        label: '총금액-오늘금액',
        color: '#ffe0b2',
      }, // 나머지 방문자 수 비율을 나타내는 색
    ],
  };
  return (
    <>
      <div className={style.wrapper}>
        <div className={`${style.box} ${style.dayBox}`}>
          <span>펀딩 종료까지</span>
          <span>16일 남음</span>
        </div>
        <div className={`${style.box}`}>
          <div className={style.title}>
            <div>
              <span>방문&하트</span>
            </div>
            <div>
              <div className={style.titleItem}>
                <span>오늘 방문 수</span>
                <span> - </span>
              </div>
              <div className={style.titleItem}>
                <span>총 밤문 수</span>
                <span> - </span>
              </div>
              <div className={style.titleItem}>
                <span>오늘 하트</span>
                <span> - </span>
              </div>
              <div className={style.titleItem}>
                <span>총 하트</span>
                <span> - </span>
              </div>
            </div>
          </div>
          <div className={style.chartBox}>
            <PieChart chartData={data['chartTodayHeart']} />
            <PieChart chartData={data['chartTotalHeart']} />
          </div>
        </div>
        <div className={`${style.box}`}>
          <div className={style.title}>
            <div>
              <span>모금액</span>
            </div>
            <div>
              <div className={style.titleItem}>
                <span>오늘 모금액</span>
                <span> - </span>
              </div>
              <div className={style.titleItem}>
                <span>총 모금액</span>
                <span> - </span>
              </div>
              <div className={style.titleItem}>
                <span>모금 달성률</span>
                <span> - </span>
              </div>
            </div>
          </div>
          <div className={style.chartBox}>
            <PieChart chartData={data['chartTodayFund']} />
          </div>
        </div>
        <div className={`${style.box}`}>
          <SponsorList />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
