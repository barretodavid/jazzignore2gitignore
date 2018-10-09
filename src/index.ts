#!/usr/bin/env node

import * as find from 'find';
import { dirname, join } from 'path';
import { exec } from 'child_process';
import { userOptions, helpMessage } from './command-line';
import { extractIgnorePatterns, createGitignoreFile } from './utils';


if (userOptions.help) {
  console.log(helpMessage);
} else {
  find.file('.jazzignore', userOptions.path, (files: string[]) => {
    files.map(file => {
      const path = dirname(file);
      const parser = join(__dirname, 'parser.awk')
      const awk = exec(`awk -f ${parser} '${file}'`);
  
      awk.stdout.on('data', (awkString: string) => {
        const ignorePatterns = extractIgnorePatterns(awkString);
        createGitignoreFile(path, ignorePatterns);
      });
    });
  });
}
