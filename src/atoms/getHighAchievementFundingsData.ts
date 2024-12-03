import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';
import { Token } from 'apiTypes/Token';

export const fetchHighAchievementFundings = atom(async () => {
  const api = new Api();
  const response = await api.getHighAchievementFundings(Token.getHeaderParms);
  const data = response.data;
  return data;
});
