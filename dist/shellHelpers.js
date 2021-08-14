#!usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = exports.runInstallCommand = void 0;
const shelljs_1 = __importDefault(require("shelljs"));
const logger_1 = require("./logger");
const logInstallOutput = ({ code, stdout, stderr }) => {
    if (code !== 0) {
        logger_1.log(`Oops! Something went wrong...\n\n${stderr}`, 'error');
        shelljs_1.default.exit(code);
    }
    else {
        logger_1.log(stdout
            .split('\n')
            .filter(line => line.startsWith('+'))
            .map(line => `Installed ${line.replace('+', '').trim()}`)
            .join('\n'), 'success');
    }
};
const runInstallCommand = (command) => {
    logInstallOutput(shelljs_1.default.exec(command, { silent: true }));
};
exports.runInstallCommand = runInstallCommand;
const runCommand = (command) => shelljs_1.default.exec(command, { silent: true });
exports.runCommand = runCommand;
