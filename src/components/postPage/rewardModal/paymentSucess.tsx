import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { useParams } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
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
      let response = null;
      if (id) {
        response = await api.paymentSucess(parseInt(id), params);
        setResponseData(response.data);
      }
    };

    passData();
  }, []);

  console.log('log: ', responseData);

  return (
    <>
      <div className="box_section" style={{ width: '600px' }}>
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: '50px' }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get('amount')).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get('orderId')}`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="p-grid-col text--right"
            id="paymentKey"
            style={{ whiteSpace: 'initial', width: '250px' }}
          >
            {`${searchParams.get('paymentKey')}`}
          </div>
        </div>
        <div className="p-grid-col">
          <Link to="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link to="https://discord.gg/A4fRFXQhRu">
            <button
              className="button p-grid-col5"
              style={{ backgroundColor: '#e8f3ff', color: '#1b64da' }}
            >
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
      <div
        className="box_section"
        style={{ width: '600px', textAlign: 'left' }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: 'initial' }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
