import { useEffect, useState } from 'react';
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from '@tosspayments/payment-widget-sdk';

export function getPaymentWidget(clientKey: string, customerKey: string) {
  const [paymentWidget, setPaymentWidget] =
    useState<PaymentWidgetInstance | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPaymentWidget = async () => {
      try {
        setLoading(true);
        const widget = await loadPaymentWidget(clientKey, customerKey);
        if (isMounted) {
          setPaymentWidget(widget);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPaymentWidget();

    return () => {
      isMounted = false;
    };
  }, [clientKey, customerKey]);

  return { paymentWidget, error, loading };
}
