import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
import jsonDiff from '../bin/jsonDiff.js';

test('testing', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const filepath3 = getFixturePath('file3.txt');

  const expected = readFileSync(filepath3, 'utf8');

  expect(jsonDiff(filepath1, filepath2)).toEqual(expected);
});
