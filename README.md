# jazz2git

Command line interface (cli) that helps in the migration from IBM RTC to Git.

It traverses a folder structure in search
for `.jazzignore` files, parses its content, and creates the equivalent `.gitignore` file.

**Note**: This script relies on the presence of `awk` in the system

## Installation

Install the cli globally

```
npm install -g jazz2git
```

## Usage

To search for `.jazzignore` files and create the corresponding `.gitignore` in a given path, run

```
jazz2git <path>
```

To get help

```
jazz2git -h
```
