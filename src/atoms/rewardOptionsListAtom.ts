import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { RewardListResponseDto } from 'apiTypes/data-contracts';

export const rewardsListAtom = atom<RewardListResponseDto[] | []>([]);

export const fetchRewardsListAtom = atom(
  null,
  async (_, set, fundingId: number) => {
    const api = new Api();
    const response = await api.getRewordsByFundingId(fundingId);
    if (response.status == 200)
      set(rewardsListAtom, response.data as RewardListResponseDto[]);
    else set(rewardsListAtom, []);
  },
);
