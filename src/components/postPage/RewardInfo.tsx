import TuiViewer from 'components/common/TuiViewer';
import { useOutletContext } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { fundingInfoAtom } from 'atoms/fundingInfo';
import { FundingDetailsResponseDto } from 'apiTypes/data-contracts';

const RewardInfo = () => {
  const id = useOutletContext() as number;
  const data = useAtomValue(
    fundingInfoAtom(Number(id)),
  ) as FundingDetailsResponseDto;

  return (
    <>
      <TuiViewer
        content={
          data.rewardInfo ? data.rewardInfo : '## 내용을 불러올 수 없습니다.'
        }
      />
    </>
  );
};

export default RewardInfo;
