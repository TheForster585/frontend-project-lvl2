#!/usr/bin/env node

import { Command } from 'commander';
import format from './formatters/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(format(filepath1, filepath2, options.format));
  });

program.parse();
