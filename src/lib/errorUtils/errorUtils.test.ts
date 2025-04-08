import { describe, it, expect } from 'vitest';

import {
  IErrorWithMessage,
  IDetailedError,
  IValidationError,
} from '@/api/types/errors';
import {
  isErrorWithMessage,
  isDetailedError,
  isValidationError,
  formatApiError,
} from './errorUtils';

describe('errorUtils', () => {
  describe('isErrorWithMessage', () => {
    it('should return true for an object with a "Message" field of type string', () => {
      const error: IErrorWithMessage = { Message: 'Server error' };
      expect(isErrorWithMessage(error)).toBe(true);
    });

    it('should return false for an object without a "Message" field', () => {
      const error = { error: 'Server error' };
      expect(isErrorWithMessage(error)).toBe(false);
    });

    it('should return false for an object with a "Message" field not of type string', () => {
      const error = { Message: 500 };
      expect(isErrorWithMessage(error)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isErrorWithMessage(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isErrorWithMessage(undefined)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(isErrorWithMessage('Server error')).toBe(false);
    });
  });

  describe('isDetailedError', () => {
    it('should return true for an object with an "error" field of type string', () => {
      const error: IDetailedError = { error: 'Server error' };
      expect(isDetailedError(error)).toBe(true);
    });

    it('should return false for an object without an "error" field', () => {
      const error = { Message: 'Server error' };
      expect(isDetailedError(error)).toBe(false);
    });

    it('should return false for an object with an "error" field not of type string', () => {
      const error = { error: 500 };
      expect(isDetailedError(error)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isDetailedError(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isDetailedError(undefined)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(isDetailedError('Server error')).toBe(false);
    });
  });

  describe('isValidationError', () => {
    it('should return true for an array of objects with loc, msg and type fields', () => {
      const errors: IValidationError[] = [
        { loc: ['field'], msg: 'field required', type: 'value_error.missing' },
      ];
      expect(isValidationError(errors)).toBe(true);
    });

    it('should return false for an empty array', () => {
      expect(isValidationError([])).toBe(false);
    });

    it('should return false for an array with objects missing required fields', () => {
      const errors = [{ field: 'field', message: 'field required' }];
      expect(isValidationError(errors)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isValidationError(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isValidationError(undefined)).toBe(false);
    });

    it('should return false for a string', () => {
      expect(isValidationError('Validation error')).toBe(false);
    });
  });

  describe('formatApiError', () => {
    it('should format an error with an "error" field', () => {
      const error: IDetailedError = { error: 'Server error' };
      expect(formatApiError(error)).toBe('Server error');
    });

    it('should format an error with a "Message" field', () => {
      const error: IErrorWithMessage = { Message: 'Server error' };
      expect(formatApiError(error)).toBe('Server error');
    });

    it('should format a validation error', () => {
      const errors: IValidationError[] = [
        {
          loc: ['user', 'name'],
          msg: 'field required',
          type: 'value_error.missing',
        },
        {
          loc: ['user', 'email'],
          msg: 'invalid email',
          type: 'value_error.email',
        },
      ];
      expect(formatApiError(errors)).toBe(
        'user.name: field required, user.email: invalid email',
      );
    });

    it('should return a string as is if a string is passed', () => {
      expect(formatApiError('Simple error')).toBe('Simple error');
    });

    it('should return "Unknown error" for an unknown format', () => {
      expect(formatApiError({ code: 500 })).toBe('Unknown error');
    });
  });
});
