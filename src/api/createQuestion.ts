import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { CommentRequestDto } from 'apiTypes/data-contracts';

export const createQuestion = async (
  questionId: number,
  data: CommentRequestDto,
) => {
  const api = new Api();
  try {
    const response = await api.createQuestion(
      questionId,
      data,
      Token.getHeaderParms,
    );
    return response;
  } catch (error) {
    console.error('creating Question error occur', error);
    return error;
  }
};
