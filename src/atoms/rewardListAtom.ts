import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { GetRewardListData } from 'apiTypes/data-contracts';

export const rewardListAtom = atom<GetRewardListData | []>([]);

export const fetchRewardListAtom = atom(
  null,
  async (_, set, fundingId: number) => {
    const api = new Api();
    try {
      const response = await api.getRewardList(fundingId);
      if (response.status === 200) {
        set(rewardListAtom, response.data);
      } else {
        throw new Error(`Failed to fetch: Status code ${response.status}`);
      }
    } catch (error) {
      console.error("Can't fetching rewardList data : ", error);
      set(rewardListAtom, []);
    }
  },
);
