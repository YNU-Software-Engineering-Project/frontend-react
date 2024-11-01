import { atom } from 'jotai';
import { Api } from 'apiTypes/Api';

export const fetchHighAchievementFundings = atom(async () => {
  const api = new Api();
  const query = { page: 1 };
  const response = await api.getHighAchievementFundings(query);
  const data = response.data;
  return data;
});
