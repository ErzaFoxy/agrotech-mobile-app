import { calculateValue } from './Calculator';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('calculateValue', () => {
  it('возвращает правильный результат в режиме "culture"', () => {
    const result = calculateValue('wheat', 'odesa', 100, 'culture');
    expect(result).toBeGreaterThan(0); // или конкретное значение, если знаешь коэффициент
  });

  it('возвращает правильный результат в режиме "area"', () => {
    const result = calculateValue('wheat', 'odesa', 100, 'area');
    expect(result).toBeGreaterThan(0); // или точное число
  });

  it('возвращает null для несуществующего региона', () => {
    const result = calculateValue('wheat', 'mars', 100, 'culture');
    expect(result).toBeNull();
  });

  it('возвращает null для несуществующей культуры', () => {
    const result = calculateValue('banana', 'odesa', 100, 'culture');
    expect(result).toBeNull();
  });
});