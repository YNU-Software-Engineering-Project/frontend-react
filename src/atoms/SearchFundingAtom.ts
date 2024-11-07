import { Api } from 'apiTypes/Api';
import { atom } from 'jotai';
import { SearchFundingData } from 'apiTypes/data-contracts';

export enum sortingEnum {
  'latest',
  'oldest',
  'priceAsc',
  'priceDesc',
  'achievementRateDesc',
  'achievementRateAsc',
  'deadlineDesc',
  'likes',
}

export type sortingType =
  | 'latest'
  | 'oldest'
  | 'priceAsc'
  | 'priceDesc'
  | 'achievementRateDesc'
  | 'achievementRateAsc'
  | 'deadlineDesc'
  | 'likes';

export enum categoryCode {
  '터·굿즈' = 'A0010',
  '홈·리빙' = 'A0020',
  '사진' = 'A0030',
  '게임' = 'A0040',
  '키즈' = 'A0050',
  '도서·전자책' = 'A0060',
  '여행' = 'A0070',
  '만화·웹툰' = 'A0080',
  '스포츠·아웃도어' = 'A0090',
  '테크·가전' = 'A0100',
  '자동차' = 'A0110',
  '패션' = 'A0120',
  '아트' = 'A0130',
  '소셜' = 'A0140',
  '영화·음악' = 'A0150',
  '반려동물' = 'A0160',
  '디자인' = 'A0170',
}
export type query = {
  keyword?: string;
  sort?: sortingType;
  categories?: string[];
  tags?: string[];
  minRate?: number;
  maxRate?: number;
  isClosed?: boolean;
  isLiked?: boolean;
  page?: number;
  size?: number;
};

export const searchFundingQueryAtom = atom<query>({
  keyword: '',
  sort: 'latest',
  categories: [],
  tags: [],
  minRate: 0,
  maxRate: 100,
  isClosed: false,
  page: 0,
  size: 6,
});

export const searchFundings = atom(async get => {
  try {
    const api = new Api();
    const response = await api.searchFunding(get(searchFundingQueryAtom));
    return response.data;
  } catch (error) {
    alert(error);
    return [];
  }
});
