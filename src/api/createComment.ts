import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';
import { CommentRequestDto } from 'apiTypes/data-contracts';

export const createComment = async (
  questionId: number,
  data: CommentRequestDto,
) => {
  const api = new Api();
  try {
    const response = await api.createComment(
      questionId,
      data,
      Token.getHeaderParms,
    );
    return response;
  } catch (error) {
    console.error('creating Commnet error occur', error);
    return error;
  }
};
