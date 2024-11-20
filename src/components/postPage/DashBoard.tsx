import style from 'styles/PostPage/DashBoard.module.css';
import PieChart from 'components/common/PieChart';
import SponsorList from './dashBoard/SponsorList';
import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  fundingDashboardAtom,
  fetchFundingDashboardAtom,
} from 'atoms/fundingDashboardAtom';
import { useParams } from 'react-router-dom';

const DashBoard = () => {
  const { id: fundingId } = useParams();
  const dashBoardInfo = useAtomValue(fundingDashboardAtom);
  const fetchdashBoardInfo = useSetAtom(fetchFundingDashboardAtom);

  useEffect(() => {
    fetchdashBoardInfo(Number(fundingId));
  }, [fetchdashBoardInfo]);

  const chartData = {
    chartTodayHeart: [
      {
        id: 0,
        value: dashBoardInfo?.todayLikes ?? 0,
        label: '오늘 하트',
        color: '#29b6f6',
      },
      {
        id: 1,
        value:
          (dashBoardInfo?.todayVisitors ?? 0) -
          (dashBoardInfo?.todayLikes ?? 0),
        label: '오늘 방문자 - 오늘 하트',
        color: '#c8e6c9',
      }, // 나머지 방문자 수 비율을 나타내는 색
    ],
    chartTotalHeart: [
      {
        id: 0,
        value: dashBoardInfo?.totalLikes ?? 0,
        label: '총 하트',
        color: '#4db6ac',
      },
      {
        id: 1,
        value:
          (dashBoardInfo?.totalVisitors ?? 0) -
          (dashBoardInfo?.totalLikes ?? 0),
        label: '총 방문자수 - 총 하트',
        color: '#b2dfdb',
      }, // 나머지 방문자 수 비율을 나타내는 색
    ],
    chartTodayFund: [
      {
        id: 0,
        value: dashBoardInfo?.currentAmount ?? 0,
        label: '오늘 금액',
        color: '#ffb74d',
      },
      {
        id: 1,
        value:
          (dashBoardInfo?.targetAmount ?? 0) -
          (dashBoardInfo?.currentAmount ?? 0),
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
          <span>{`${dashBoardInfo?.remainingDays}일 남음`} </span>
        </div>
        <div className={`${style.box}`}>
          <div className={style.title}>
            <div>
              <span>방문&하트</span>
            </div>
            <div>
              <div className={style.titleItem}>
                <span>오늘 방문 수</span>
                <span> {`${dashBoardInfo?.todayVisitors}`} </span>
              </div>
              <div className={style.titleItem}>
                <span>총 밤문 수</span>
                <span> {`${dashBoardInfo?.totalVisitors}`} </span>
              </div>
              <div className={style.titleItem}>
                <span>오늘 하트</span>
                <span> {`${dashBoardInfo?.todayLikes}`} </span>
              </div>
              <div className={style.titleItem}>
                <span>총 하트</span>
                <span> {`${dashBoardInfo?.totalLikes}`} </span>
              </div>
            </div>
          </div>
          <div className={style.chartBox}>
            <PieChart chartData={chartData['chartTodayHeart']} />
            <PieChart chartData={chartData['chartTotalHeart']} />
          </div>
        </div>
        <div className={`${style.box}`}>
          <div className={style.title}>
            <div>
              <span>모금액</span>
            </div>
            <div>
              <div className={style.titleItem}>
                <span>현재 모금액</span>
                <span>
                  {' '}
                  {`${dashBoardInfo?.currentAmount?.toLocaleString('ko-KR')}₩`}{' '}
                </span>
              </div>
              <div className={style.titleItem}>
                <span>총 모금액</span>
                <span>
                  {' '}
                  {`${dashBoardInfo?.targetAmount?.toLocaleString('ko-KR')}₩`}{' '}
                </span>
              </div>
              <div className={style.titleItem}>
                <span>모금 달성률</span>
                <span> {`${dashBoardInfo?.fundingAchievementRate}%`} </span>
              </div>
            </div>
          </div>
          <div className={style.chartBox}>
            <PieChart chartData={chartData['chartTodayFund']} />
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
