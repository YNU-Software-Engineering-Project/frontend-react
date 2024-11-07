import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const deleteComment = async (questionId: number) => {
  const api = new Api();
  try {
    const response = await api.deleteComment(questionId, Token.getHeaderParms);
    return response;
  } catch (error) {
    console.error('Commnet deleting error occur', error);
    return error;
  }
};
