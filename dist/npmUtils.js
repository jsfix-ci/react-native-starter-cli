#!usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.runPrettier = exports.installRedux = exports.installNavigation = exports.installCoreDeps = exports.createProject = void 0;
const logger_1 = require("./logger");
const shellHelpers_1 = require("./shellHelpers");
const createProject = (name) => {
    logger_1.log('Creating React Native project');
    shellHelpers_1.runCommand(`react-native init ${name}`);
};
exports.createProject = createProject;
const installCoreDeps = () => {
    logger_1.log('Installing TypeScript, ESLint Typescript parser and plugins, Prettier');
    shellHelpers_1.runInstallCommand(`npm i -D typescript @types/react @types/react-native @types/jest \
      @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks \
      prettier`);
};
exports.installCoreDeps = installCoreDeps;
const installNavigation = () => {
    logger_1.log('Installing React Navigation and its dependencies');
    shellHelpers_1.runInstallCommand(`npm i @react-navigation/native @react-navigation/stack \
         react-native-screens react-native-safe-area-context react-native-gesture-handler`);
};
exports.installNavigation = installNavigation;
const installRedux = () => {
    logger_1.log('Installing Redux, React Redux, and Redux Toolkit');
    shellHelpers_1.runInstallCommand('npm i redux react-redux @reduxjs/toolkit');
    shellHelpers_1.runInstallCommand('npm i -D @types/react-redux');
};
exports.installRedux = installRedux;
const runPrettier = () => {
    shellHelpers_1.runCommand('npx prettier --write .');
};
exports.runPrettier = runPrettier;
exports.x = {};
