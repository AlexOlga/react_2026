import { describe, test, expect } from 'vitest';
import isEmail from './isEmail';

describe('isEmail', () => {
  test('valid email', () => {
    expect(isEmail('user@mail.com')).toBe(true);
  });
  test('invalid email', () => {
    expect(isEmail('user@mail')).toBe(false);
    expect(isEmail('usermail')).toBe(false);
    expect(isEmail('@mail')).toBe(false);
  });
});
