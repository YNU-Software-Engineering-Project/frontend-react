import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';
import { GetCommentsByQuestionData } from 'apiTypes/data-contracts';

export const commuityCommentAtom = atom<GetCommentsByQuestionData | []>([]);

export const fetchCommunityCommentAtom = atom(
  null,
  async (_, set, questionId: number) => {
    try {
      const api = new Api();
      const response = await api.getCommentsByQuestion(questionId);
      set(commuityCommentAtom, response.data);
    } catch (error) {
      console.error("Error can't fetching community comment:", error);
      set(commuityCommentAtom, []); // 오류가 발생한 경우 빈 배열로 설정
    }
  },
);
