import * as find from 'find';
import { createWriteStream, readFile, readFileSync } from 'fs';
import { dirname } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import awk from 'awk';
import { curry, compose } from 'ramda';

interface Ignore {
  plain: string[];
  recursive: string[];
}

function extractIgnorePatterns(awkString: string): Ignore {
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

function createGitignoreFile(path: string, ignorePatterns: Ignore): void {
  const logger = createWriteStream(`${path}/.gitignore`, { flags: 'w' });
  ignorePatterns.recursive.forEach(pattern => {
    logger.write(`**/${pattern}\n`, console.log);
  });
  ignorePatterns.plain.forEach(pattern => {
    logger.write(pattern, console.log);
  });
  logger.end();
}

/**
 * Find all the .gitignore files of a given folder recursively
 * 
 * @returns An array of paths were the .gitignore files are located
 */
function findFiles(file: string, folder: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    find
      .file(file, folder, resolve)
      .error(reject);
  });
}



async function main() {

  

  const readFileAsync = promisify(readFile);

  

  const files = await findFiles('.jazzignore', '../StreamP3-bk/');
    
  files.map(async file => {
    

    const awkContent = readFileSync('./parser.awk');
    const fileContent = readFileSync(file);

    const { stdout } = awk(awkContent, fileContent);
    // console.log(stdout);
    
    const path = dirname(file);
    const ignorePatterns = extractIgnorePatterns(stdout);
    
    compose(curry(createGitignoreFile)(path), extractIgnorePatterns);

    // const awkExec = exec(`awk -f ./parser.awk '${file}'`);

    // readFileAsync(file);
    // readFileAsync('./parser.awk');

    // const files = await Promise.all([
    //   readFileAsync(file),
    //   readFileAsync('./parser.awk'),
    // ]);

    // awkExec.stdout.on('data', (awkString: string) => {
    //   const ignorePatterns = extractIgnorePatterns(awkString);
    //   createGitignoreFile(ignorePatterns, path);
    // });

  });

  // find.file('.jazzignore', '../StreamP3-bk/', (files: string[]) => {
  //   files.map(file => {
  //     const path = dirname(file);
  //     const awk = exec(`awk -f ./parser.awk '${file}'`);
  
  //     awk.stdout.on('data', (awkString: string) => {
  //       const ignorePatterns = extractIgnorePatterns(awkString);
  //       createGitignoreFile(ignorePatterns, path);
  //     });
  
  //   });
  // });
}

main();