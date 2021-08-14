#!usr/bin/env ts-node

import { log } from './logger';
import { runCommand, runInstallCommand } from './shellHelpers';

export const createProject = (name: string) => {
  log('Creating React Native project');
  runCommand(`react-native init ${name}`);
};

export const installCoreDeps = () => {
  log('Installing TypeScript, ESLint Typescript parser and plugins, Prettier');
  runInstallCommand(
    `npm i -D typescript @types/react @types/react-native @types/jest \
      @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks \
      prettier`,
  );
};

export const installNavigation = () => {
  log('Installing React Navigation and its dependencies');
  runInstallCommand(
    `npm i @react-navigation/native @react-navigation/stack \
         react-native-screens react-native-safe-area-context react-native-gesture-handler`,
  );
};

export const installRedux = () => {
  log('Installing Redux, React Redux, and Redux Toolkit');
  runInstallCommand('npm i redux react-redux @reduxjs/toolkit');
  runInstallCommand('npm i -D @types/react-redux');
};

export const runPrettier = () => {
  runCommand('npx prettier --write .');
};

export const x = {};
