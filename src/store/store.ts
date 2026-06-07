import { create } from 'zustand';
import type { User } from '../types/User';

export interface IFormsStore {
  users: User[];
  addForm: (form: User) => void;
  countries: string[];
}

export const useForms = create<IFormsStore>((set) => ({
  users: [],
  countries: [
    'Belarus',
    'France',
    'Germany',
    'Italy',
    'Poland',
    'Russia',
    'Spain',
    'Ukraine',
  ],
  addForm: (user: User) =>
    set((state) => ({ users: state.users.concat(user) })),
}));
