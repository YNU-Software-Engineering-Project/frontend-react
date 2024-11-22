import { atom } from 'jotai';
import { Item } from 'types/atomTypes';

export const itemsAtom = atom<Record<number, Item>>({});

export const updateItemsAtom = atom(
  null,
  (get, set, updateInfo: { id: number; amount: number; price: number }) => {
    if (!updateInfo) return;

    const oldItems = get(itemsAtom);
    const updatedItem = { ...oldItems[updateInfo.id], ...updateInfo };
    const newItems = { ...oldItems, [updateInfo.id]: updatedItem };

    set(itemsAtom, newItems);
  },
);

export const resetItemsAtom = atom(null, (_, set) => {
  set(itemsAtom, {});
});
