import { Item } from 'types/atomTypes';

export function calculateTotalPrice(list: Record<number, Item>) {
  return Object.values(list).reduce(
    (total: number, item: Item) => total + item.amount * item.price,
    0,
  );
}

export function composeListInfo(list: Record<number, Item>) {
  return Object.values(list).reduce(
    (total: string, item: Item) => `${item.id}:${item.amount},`,
    '',
  );
}
