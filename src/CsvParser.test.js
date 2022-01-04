import {getPicks} from './CsvParser';

describe('getPicks', () => {
  it('gives empty sheet for missing input', () => {
    expect(getPicks()).toEqual([[]]);
  });

  it('gives sheet with picks that start with numbers, stripping the starting number', () => {
    const input = [
      ['', 'bob', 'mary'],
      ['1', 'a', 'b'],
      ['2', 'c', 'd'],
    ];

    const picks = getPicks(input);

    expect(picks).toEqual([
      [input[1][1], input[1][2]],
      [input[2][1], input[2][2]]
    ]);
  });

  it('filters rows that are not picks', () => {
    const input = [
      ['', 'bob', 'mary'],
      ['notes', 'silly', 'goose'],
      ['1', 'a', 'b'],
    ];

    const picks = getPicks(input);

    expect(picks).toEqual([
      [input[2][1],input[2][2]],
    ]);
  });
});
