import { useState, useRef, useEffect, FC } from 'react';
import { itemsAtom } from 'atoms/rewardItemsAtom';
import { clientKey } from 'env';
import {
  PaymentWidgetInstance,
  ANONYMOUS,
} from '@tosspayments/payment-widget-sdk';
import { getPaymentWidget } from 'api/getPaymentWidget';
import { useAtomValue } from 'jotai';
import { calculateTotalPrice, composeListInfo } from 'helper';
import { useParams } from 'react-router-dom';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { UserProfileDataDto } from 'apiTypes/data-contracts';

type PaymentModalProps = {
  setOpenPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentModal: FC<PaymentModalProps> = ({ setOpenPaymentModal }) => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState<UserProfileDataDto | null>();

  // 사용자정보 받기
  useEffect(() => {
    const getUserInfo = async () => {
      const api = new Api();
      const response = await api.getUserProfile(Token.getHeaderParms);
      if (response.status == 200) {
        const data = response.data as UserProfileDataDto;
        setUserInfo(data);
        console.log(data);
      } else {
        alert('로그인 되어 있지 않습니다.');
      }
    };
    getUserInfo();
  }, [setUserInfo]);

  //PG 모듈부분
  const items = useAtomValue(itemsAtom);

  const { paymentWidget } = getPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance['renderPaymentMethods']
  > | null>(null);
  const [price, setPrice] = useState(0);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] =
    useState(false);
  const selector = '#payment-widget';

  useEffect(() => {
    const calPrice = calculateTotalPrice(items);
    setPrice(calPrice);
  }, [setPrice]);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제 UI 렌더링 ------
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: 'DEFAULT' },
    );

    // ------  이용약관 UI 렌더링 ------
    paymentWidget.renderAgreement('#agreement', { variantKey: 'AGREEMENT' });

    //  ------  결제 UI 렌더링 완료 이벤트 ------
    paymentMethodsWidget.on('ready', () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  if (Object.keys(items).length === 0) {
    alert('상품을 선택하지 않았습니다.');
    setOpenPaymentModal(false);
    return <></>;
  }

  return (
    <>
      <div id="payment-widget" />
      <div id="agreement" />
      <button
        className="button"
        style={{ marginTop: '30px' }}
        disabled={!paymentMethodsWidgetReady}
        onClick={async () => {
          try {
            console.log(composeListInfo(items));
            /*orderid바꾸기*/
            await paymentWidget?.requestPayment({
              orderId: 'addd3312312asasdadsasdda343',
              orderName: composeListInfo(items),
              customerName: userInfo?.nickname,
              customerEmail: userInfo?.schoolEmail,
              customerMobilePhone: userInfo?.phoneNumber,
              successUrl: `${window.location.origin}/payment/${id}/success`,
              failUrl: `${window.location.origin}/payment/${id}/fail`,
            });
          } catch (error) {
            // 에러 처리하기
            console.error(error);
          }
        }}
      >
        결제하기
      </button>
    </>
  );
};

export default PaymentModal;
