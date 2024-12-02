import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { useParams } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();

  useEffect(() => {
    const params = {
      ...Token.getHeaderParms,
      body: {
        orderId: searchParams.get('orderId'),
        amount: searchParams.get('amount'),
        paymentKey: searchParams.get('paymentKey'),
      },
    };
    const passData = async () => {
      const api = new Api();
      if (id) {
        await api.paymentSucess(parseInt(id), params);
      }
    };

    passData();
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '600px',
          }}
        >
          <img
            width="100px"
            src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
          />
          <h2>결제를 완료했어요</h2>
          <div style={{ marginTop: '50px' }}>
            <div>
              <b>결제금액</b>
            </div>
            <div id="amount">
              {`${Number(searchParams.get('amount')).toLocaleString()}원`}
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div>
              <b>주문번호</b>
            </div>
            <div id="orderId">{`${searchParams.get('orderId')}`}</div>
          </div>
          <div
            style={{
              marginTop: '10px',
              cursor: 'pointer',
              color: 'rgb(78,125,238)',
              textAlign: 'right',
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            <p>돌아가기</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
