import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import jsonDiff from '../bin/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const filepath3 = getFixturePath('file3.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(jsonDiff('file1.json', 'file2.json')).toEqual(expected);
});

test('yaml', () => {
  const filepath3 = getFixturePath('file3.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(jsonDiff('file1.yml', 'file2.yml')).toEqual(expected);
});
