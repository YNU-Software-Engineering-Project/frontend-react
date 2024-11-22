import { Item } from 'types/atomTypes';

export function calculateTotalPrice(list: Record<string, Item>) {
  return Object.values(list).reduce(
    (total: number, item: Item) =>
      total + parseInt(item.amount) * parseInt(item.price),
    0,
  );
}

export function composeListInfo(list: Record<number, Item>) {
  return Object.values(list).reduce(
    (total: string, item: Item) => total + `${item.id}:${item.amount},`,
    '',
  );
}
