import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFilePath = (filename) => (path.resolve(process.cwd(), filename));
const getFileExt = (filename) => path.extname(filename);

const readFile = (pathOfFile) => readFileSync(pathOfFile, 'utf8');

const getObjectFromFile = (filename) => {
  const filePath = getFilePath(filename);
  const fileExt = getFileExt(filename);
  const fileString = readFile(filePath);
  if (fileExt === '.json') {
    const fileObj = JSON.parse(fileString);
    return fileObj;
  }
  if (fileExt === '.yml' || fileExt === 'yaml') {
    const fileObj = yaml.load(fileString);
    return fileObj;
  }
  return 'Unknown file extension';
};

export default getObjectFromFile;
