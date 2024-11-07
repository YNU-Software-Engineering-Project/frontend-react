import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { FunderDataDto } from 'apiTypes/data-contracts';
import { Token } from 'apiTypes/Token';

export enum sortEnum {
  'latest',
  //  ' 최근 후원 순'
  'oldest',
  //  ' 가입 오래된 순',
  'idAsc',
  //  ' 아이디 오름차순',
  'idDesc',
  //  ' 아이디 내림차순',
  'nicknameAsc',
  // ' 닉네임 오름차순',
  'nicknameDesc',
  //  ' 닉네임 내림차순',
  'emailAsc',
  //  ' 이메일 오름차순',
  'emailDesc',
  //  ' 이메일 내림차순',
  'adAsc',
  //  ' 주소 오름차순',
  'adDesc',
  //  ' 주소 내림차순',
  'phoneNumAsc',
  //  ' 전화번호 오름차순',
  'phoneNumDesc',
  //  ' 전화번호 내림차순',
}

type query = {
  /**
   *         latest: 최근 후원 순, oldest: 가입 오래된 순,
   *         idAsc: 아이디 오름차순, idDesc: 아이디 내림차순,
   *         nicknameAsc: 닉네임 오름차순, nicknameDesc: 닉네임 내림차순,
   *         emailAsc: 이메일 오름차순, emailAsc: 이메일 내림차순,
   *         adAsc: 주소 오름차순, adDesc: 주소 내림차순,
   *         phoneNumAsc: 전화번호 오름차순, phoneNumDesc: 전화번호 내림차순,
   * @default "latest"
   */
  sort?: string;
  /** 아이디로 검색 */
  id?: string;
  /**
   * 리워드 옵션 번호
   * @format int32
   * @example 0
   */
  rewardNo?: number;
  /**
   * @format int32
   * @default 0
   */
  page?: number;
  /**
   * @format int32
   * @default 10
   */
  size?: number;
};

export const funderListAtom = atom<FunderDataDto[] | []>([]);

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
        set(funderListAtom, response.data as FunderDataDto[]);
      else throw new Error(`Failed to fetch: Status code ${response.status}`);
    } catch (error) {
      console.error("Can't fetching rewardList data : ", error);
      set(funderListAtom, []);
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
