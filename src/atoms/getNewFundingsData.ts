import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const fetchNewFundings = atom(async () => {
  const api = new Api();
  const query = { page: 1 };
  const response = await api.getNewFundings(query, Token.getHeaderParms);
  const data = response.data;
  return data;
});
