import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';
import { GetQuestionsByFundingData } from 'apiTypes/data-contracts';

export const commuityQuestionsAtom = atom<GetQuestionsByFundingData | []>([]);

export const fetchCommunityQuestionsAtom = atom(
  null,
  async (_, set, fundingId: number) => {
    try {
      const api = new Api();
      const response = await api.getQuestionsByFunding(fundingId);
      set(commuityQuestionsAtom, response.data);
    } catch (error) {
      console.error('Error fetching community questions:', error);
      set(commuityQuestionsAtom, []); // 오류가 발생한 경우 빈 배열로 설정
    }
  },
);
