import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import stylish from '../bin/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const filepath3 = getFixturePath('file3.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(stylish('file1.json', 'file2.json')).toEqual(expected);
});

test('yaml', () => {
  const filepath3 = getFixturePath('file3.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(stylish('file1.yml', 'file2.yml')).toEqual(expected);
});

test('recursive json', () => {
  const filepath6 = getFixturePath('file6.txt');

  const expected = readFileSync(filepath6, 'utf8');

  expect(stylish('file4.json', 'file5.json')).toEqual(expected);
});

test('recursive yaml', () => {
  const filepath6 = getFixturePath('file6.txt');

  const expected = readFileSync(filepath6, 'utf8');

  expect(stylish('file4.yml', 'file5.yml')).toEqual(expected);
});
