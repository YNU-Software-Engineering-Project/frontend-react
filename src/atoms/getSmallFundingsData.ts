import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';

export const fetchSmallFundings = atom(async () => {
  const api = new Api();
  const query = { page: 1 };
  const response = await api.getSmallFundings(query);
  const data = response.data;
  return data;
});
