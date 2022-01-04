import {getPicks} from './CsvParser';

describe('getPicks', () => {
  it('gives empty response for missing input', () => {
    expect(getPicks()).toBeUndefined();
  });
});
