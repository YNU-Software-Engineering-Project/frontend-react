import { atom } from 'jotai';

export const fundingIdAtom = atom<number | null>(null);
export const projectNameAtom = atom<string>('');
export const mainImageAtom = atom<string | null>();
