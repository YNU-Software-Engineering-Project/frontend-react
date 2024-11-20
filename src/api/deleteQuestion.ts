import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const deleteQuestion = async (questionId: number) => {
  const api = new Api();
  try {
    const response = await api.deleteQuestion(questionId, Token.getHeaderParms);
    return response;
  } catch (error) {
    console.error('qustion deleting error occur', error);
    return error;
  }
};
