import { describe, test, expect } from 'vitest';
import { useForms } from './store';
const mockUser = {
  name: 'Ivan',
  age: 20,
  email: 'qw@qw.qw',
  gender: 'Mail',
  country: 'France',
  isNew: true,
};

describe('Store', () => {
  test('adds form', () => {
    useForms.getState().addForm(mockUser);
    expect(useForms.getState().users).toHaveLength(1);
  });
  test('returns countries', () => {
    const countries = useForms.getState().countries;
    expect(countries).toContain('France');
  });
});
