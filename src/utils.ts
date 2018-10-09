import { createWriteStream } from 'fs';
import { join } from 'path';

interface Ignore {
  plain: string[];
  recursive: string[];
}

export function extractIgnorePatterns(awkString: string): Ignore {
  const awkArray = awkString.split('\n').slice(0,-1);
  const ignore: Ignore = awkArray.reduce((ignore: Ignore, curr: string) => {
    const [label, ...values] = curr.split(',');
    if (label == 'recursive') {
      return {...ignore, recursive: values}
    } else {
      return {...ignore, plain: values };
    }
  }, { plain: [], recursive: [] });
  return ignore;
}

export function createGitignoreFile(path: string, ignorePatterns: Ignore): void {
  const logger = createWriteStream(join(path, '.gitignore'), { flags: 'w' });
  ignorePatterns.recursive.forEach(pattern => {
    logger.write(`**/${pattern}\n`);
  });
  ignorePatterns.plain.forEach(pattern => {
    logger.write(pattern);
  });
  logger.end();
}
