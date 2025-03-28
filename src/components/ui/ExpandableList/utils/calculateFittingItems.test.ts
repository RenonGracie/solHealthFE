import { describe, it, expect } from 'vitest';
import { calculateFittingItems } from './calculateFittingItems';

const DEFAULT_PARAMS = {
  containerWidth: 500,
  itemGap: 8,
  initialWidth: 0,
  itemElements: [],
};

describe('calculateFittingItems', () => {
  const createMockElement = (width: number): HTMLDivElement =>
    ({
      offsetWidth: width,
    }) as HTMLDivElement;

  it('returns 0 when there are no items', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      itemElements: [],
    });

    expect(result).toBe(0);
  });

  it('returns 0 when container width is too small', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      containerWidth: 10,
      itemElements: [createMockElement(100)],
    });

    expect(result).toBe(0);
  });

  it('correctly calculates items that fit without initial width', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      containerWidth: 500,
      itemGap: 10,
      itemElements: [
        createMockElement(100),
        createMockElement(100),
        createMockElement(100),
      ],
    });

    expect(result).toBe(3);
  });

  it('correctly calculates items with initial width (e.g., for "more" button)', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      containerWidth: 500,
      itemGap: 10,
      initialWidth: 92,
      itemElements: [
        createMockElement(100),
        createMockElement(100),
        createMockElement(100),
      ],
    });

    expect(result).toBe(3);
  });

  it('handles null elements in the array', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      containerWidth: 500,
      itemGap: 10,
      itemElements: [createMockElement(100), null, createMockElement(100)],
    });

    expect(result).toBe(2);
  });

  it('stops calculating when width exceeds container width', () => {
    const result = calculateFittingItems({
      ...DEFAULT_PARAMS,
      containerWidth: 250,
      itemGap: 10,
      itemElements: [
        createMockElement(100),
        createMockElement(100),
        createMockElement(100),
      ],
    });

    expect(result).toBe(2);
  });
});
