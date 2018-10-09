import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide',
  },
  {
    name: 'path',
    alias: 'p',
    type: String,
    description: 'Path to recursively find .jazzignore files',
    defaultOption: true,
  },
];

export const userOptions = commandLineArgs(optionDefinitions);

export const helpMessage = commandLineUsage([
  {
    header: 'jazz2git',
    content: 'A script to create .gitignore files from .jazzignore files'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    content: 'Project home: {underline https://github.com/barretodavid/jazzignore2gitignore}'
  }
]);