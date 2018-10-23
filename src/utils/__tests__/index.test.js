import { queryInputElementInside } from '../index';

describe('queryInputElementInside', () => {
  it('is a function', () => {
    expect(queryInputElementInside).toEqual(expect.any(Function));
  });

  it('returns the same HTMLInputElement when HTMLInputElement is passed', () => {
    const input = document.createElement('input');
    input.type = 'text';
    expect(queryInputElementInside(input)).toBe(input);
  });

  it('returns inner HTMLInputElement when HTMLElement with input is passed', () => {
    const root = document.createElement('div');
    const input = document.createElement('input');
    root.appendChild(input);
    expect(queryInputElementInside(root)).toBe(input);
  });

  it('returns original HTMLElement when HTMLElement without input is passed', () => {
    const root = document.createElement('div');
    const p = document.createElement('p');
    const span = document.createElement('span');
    p.appendChild(span);
    root.appendChild(p);
    expect(queryInputElementInside(root)).toBe(root);
  });

  it('throws an error when not HTMLElement is passed', () => {
    expect(() => queryInputElementInside('')).toThrowErrorMatchingSnapshot();
  });
});
