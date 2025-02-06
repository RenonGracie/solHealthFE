import { operations } from './api';

export type ApiResponse<T extends keyof operations> =
  operations[T]['responses'] extends {
    200: { content: { 'application/json': unknown } };
  }
    ? operations[T]['responses'][200]['content']['application/json']
    : never;

export type ApiParams<T extends keyof operations> =
  operations[T]['parameters']['query'];

export type ApiRequestBody<T extends keyof operations> =
  operations[T]['requestBody'] extends {
    content: { 'application/json': unknown };
  }
    ? operations[T]['requestBody']['content']['application/json']
    : never;
