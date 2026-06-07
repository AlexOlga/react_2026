import { create } from 'zustand'
import type { User } from '../types/User';

export interface IFormsStore {
  forms: User[];
  addForm: (form: User) => void;
   countries:string[]
}

export const useForms = create<IFormsStore>((set) => ({
  forms: [],
  countries: ['Belarus', 'France', 'Germany','Italy','Poland','Russia','Spain', 'Ukraine'],
  addForm: (form: User) => set((state) => ({  forms: state.forms.concat(form) })),
 
}))