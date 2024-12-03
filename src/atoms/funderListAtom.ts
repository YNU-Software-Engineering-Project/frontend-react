import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { GetFunderListResponseDto } from 'apiTypes/data-contracts';
import { Token } from 'apiTypes/Token';

export enum sortByEnum {
  'latest',
  'oldest',
  'idAsc',
  'idDesc',
  'nicknameAsc',
  'nicknameDesc',
  'emailAsc',
  'emailDesc',
  'adAsc',
  'adDesc',
  'phoneNumAsc',
  'phoneNumDesc',
}

type query = {
  sort?: string;
  id?: string;
  rewardNo?: number;
  page?: number;
  size?: number;
};

export const funderListAtom = atom<GetFunderListResponseDto | null>(null);

export const fetchFunderListAtom = atom(
  null,
  async (get, set, fundingId: number) => {
    const api = new Api();
    try {
      const response = await api.getFunderList(
        fundingId,
        get(funderListQueryAtom),
        Token.getHeaderParms,
      );
      if (response.status == 200)
        set(funderListAtom, response.data as GetFunderListResponseDto);
      else throw new Error(`Failed to fetch: Status code ${response.status}`);
    } catch (error) {
      console.error("Can't fetching rewardList data : ", error);
      set(funderListAtom, null);
    }
  },
);

export const funderListQueryAtom = atom<query>({});

export const setfunderListQueryAtom = atom(
  null,
  (get, set, newQuery: query) => {
    const updateData = {
      ...get(funderListQueryAtom),
      ...newQuery,
    };
    set(funderListQueryAtom, updateData);
  },
);
