import {WordFilterPipe} from './word-filter.pipe';

const valueMock = [
  {
    id: 313904,
    word: 'picometers',
    translation: 'picometers',
  },
  {
    id: 8590808,
    word: 'Ronbot',
    translation: 'Ronbot',
  },
  {
    id: 260128,
    word: 'courtezans',
    translation: 'courtezans',
  },
  {
    id: 2460988,
    word: 'manpurse',
    translation: 'manpurse',
  },
];

const filterResultMock = [
  {
    id: 8590808,
    word: 'Ronbot',
    translation: 'Ronbot',
  },
];

describe('WordFilterPipe', () => {
  it('should create', () => {
    const pipe = new WordFilterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should filter array of words using term', () => {
    const testPipe = new WordFilterPipe();
    const filteredByPipe = testPipe.transform(valueMock, 'word', 'Ronbot');
    expect(filteredByPipe).toEqual(filterResultMock);
  });

  it('should filter array of words using blank term', () => {
    const testPipe = new WordFilterPipe();
    const filteredByPipe = testPipe.transform(valueMock, 'word', '');
    expect(filteredByPipe).toEqual(valueMock);
  });
});
