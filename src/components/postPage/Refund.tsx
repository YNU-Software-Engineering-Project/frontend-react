import TuiViewer from 'components/common/TuiViewer';
import { useOutletContext } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { fundingInfoAtom } from 'atoms/fundingInfo';
import { FundingDetailsResponseDto } from 'apiTypes/data-contracts';

const Refund = () => {
  const id = useOutletContext() as number;
  const data = useAtomValue(
    fundingInfoAtom(Number(id)),
  ) as FundingDetailsResponseDto;

  return (
    <>
      <TuiViewer
        content={data.refundPolicy ? data.refundPolicy : '## 환불내용입니다.'}
      />
    </>
  );
};

export default Refund;
