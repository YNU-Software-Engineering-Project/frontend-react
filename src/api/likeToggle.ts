import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const likeToggle = async (fundingId: number) => {
  const api = new Api();
  try {
    const response = await api.toggleFundingLike(
      { fundingId },
      Token.getHeaderParms,
    );
    return response;
  } catch (error) {
    console.error('qustion deleting error occur', error);
    return error;
  }
};
