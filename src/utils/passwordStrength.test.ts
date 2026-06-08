import { describe, expect, test } from 'vitest';
import { getPasswordChecks } from './getPasswordChecks';

describe('getPasswordChecks', () => {
  test('detects all requirements', () => {
    expect(getPasswordChecks('Test123!')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
  test('no special symbol', () => {
    expect(getPasswordChecks('Test123')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: false,
    });
  });
  test('no number', () => {
    expect(getPasswordChecks('Test!')).toEqual({
      hasNumber: false,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
  test('no Uppercase', () => {
    expect(getPasswordChecks('test123!')).toEqual({
      hasNumber: true,
      hasUppercase: false,
      hasLowercase: true,
      hasSpecial: true,
    });
  });
  test('no Lowercase', () => {
    expect(getPasswordChecks('T123!')).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: false,
      hasSpecial: true,
    });
  });
});
