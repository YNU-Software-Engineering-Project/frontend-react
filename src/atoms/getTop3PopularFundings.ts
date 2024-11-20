import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const fetchTop3PopularFundings = atom(async () => {
  const api = new Api();
  const response = await api.getTop3PopularFundings(Token.getHeaderParms);
  const data = response.data;
  return data;
});
