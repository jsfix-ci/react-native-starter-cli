#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';

const currentDir = path.resolve(__dirname);
const splitPath = currentDir.split(path.sep);
const parentDir = splitPath.slice(0, splitPath.length - 1).join(path.sep);
const targetProjectRoot = path.resolve('./');

const copyFile = (src: string, dst: string) => {
  fs.copyFileSync(
    path.join(currentDir, src),
    path.join(targetProjectRoot, dst),
  );
};

const copyTsConfig = () =>
  fs.copyFileSync(
    path.join(parentDir, 'setupFiles', '_tsconfig.json'),
    path.join(targetProjectRoot, 'tsconfig.json'),
  );

const copyEsLintConfig = () =>
  copyFile('setupFiles/_.eslintrc.js', '.eslintrc.js');

const copyPrettierConfig = () =>
  copyFile('setupFiles/_.prettierrc.js', '.prettierrc');

const copyJestConfig = () =>
  copyFile('setupFiles/_jest.setup.js', 'jest.setup.js');

export const copyConfigFiles = () => {
  copyTsConfig();
  copyEsLintConfig();
  copyPrettierConfig();
  copyJestConfig();
};
