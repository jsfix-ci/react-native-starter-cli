#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyConfigFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const currentDir = path_1.default.resolve(__dirname);
const splitPath = currentDir.split(path_1.default.sep);
const parentDir = splitPath.slice(0, splitPath.length - 1).join(path_1.default.sep);
const targetProjectRoot = path_1.default.resolve('./');
const copyFile = (src, dst) => {
    fs_1.default.copyFileSync(path_1.default.join(currentDir, src), path_1.default.join(targetProjectRoot, dst));
};
const copyTsConfig = () => fs_1.default.copyFileSync(path_1.default.join(parentDir, 'setupFiles', '_tsconfig.json'), path_1.default.join(targetProjectRoot, 'tsconfig.json'));
const copyEsLintConfig = () => copyFile('setupFiles/_.eslintrc.js', '.eslintrc.js');
const copyPrettierConfig = () => copyFile('setupFiles/_.prettierrc.js', '.prettierrc');
const copyJestConfig = () => copyFile('setupFiles/_jest.setup.js', 'jest.setup.js');
const copyConfigFiles = () => {
    copyTsConfig();
    copyEsLintConfig();
    copyPrettierConfig();
    copyJestConfig();
};
exports.copyConfigFiles = copyConfigFiles;
