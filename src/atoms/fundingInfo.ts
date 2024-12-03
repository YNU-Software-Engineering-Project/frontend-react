import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { Api } from 'apiTypes/Api';

export const fundingInfoAtom = atomFamily((id: number) =>
  atom(async () => {
    const api = new Api();
    const response = await api.getFundingStory(id);
    if (response.status == 200) {
      return response.data;
    }
    return response;
  }),
);
