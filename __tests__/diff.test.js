import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const filepath3 = getFixturePath('stylish.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(stylish('../__fixtures__/file1.json', '../__fixtures__/file2.json')).toEqual(expected);
});

test('yaml', () => {
  const filepath3 = getFixturePath('stylish.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(stylish('../__fixtures__/file1.yml', '../__fixtures__/file2.yml')).toEqual(expected);
});

test('recursive json', () => {
  const filepath6 = getFixturePath('stylish_recursive.txt');

  const expected = readFileSync(filepath6, 'utf8');

  expect(stylish('../__fixtures__/file4.json', '../__fixtures__/file5.json')).toEqual(expected);
});

test('recursive yaml', () => {
  const filepath6 = getFixturePath('stylish_recursive.txt');

  const expected = readFileSync(filepath6, 'utf8');

  expect(stylish('../__fixtures__/file4.yml', '../__fixtures__/file5.yml')).toEqual(expected);
});

test('plain', () => {
  const filepath7 = getFixturePath('plain.txt');

  const expected = readFileSync(filepath7, 'utf8');

  expect(plain('../__fixtures__/file4.json', '../__fixtures__/file5.json')).toEqual(expected);
});

test('json', () => {
  const filepath8 = getFixturePath('json.json');

  const expected = readFileSync(filepath8, 'utf8');

  expect(json('../__fixtures__/file4.json', '../__fixtures__/file5.json')).toEqual(expected);
});
