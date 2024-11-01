import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';

export const fetchTop3PopularFundings = atom(async () => {
  const api = new Api();
  const response = await api.getTop3PopularFundings();
  const data = response.data;
  return data;
});
