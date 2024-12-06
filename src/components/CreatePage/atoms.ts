import { atom } from 'jotai';

export const fundingIdAtom = atom<number | null>(localStorage.getItem('fundingId') !== null ? parseInt(localStorage.getItem('fundingId')!, 10) : null
);