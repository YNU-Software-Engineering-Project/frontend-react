import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { FundingDashboardResponseDto } from 'apiTypes/data-contracts';

export const fundingDashboardAtom = atom<FundingDashboardResponseDto | null>(
  null,
);

export const fetchFundingDashboardAtom = atom(
  null,
  async (_, set, fundingId: number) => {
    const api = new Api();
    try {
      const response = await api.getFundingDashboard(fundingId);
      if (response.status == 200) set(fundingDashboardAtom, response.data);
      else throw new Error(`Failed to fetch: Status code ${response.status}`);
    } catch (error) {
      console.error("Can't fetching rewardList data : ", error);
      set(fundingDashboardAtom, null);
    }
  },
);
