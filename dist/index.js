#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = require("./logger");
const npmUtils_1 = require("./npmUtils");
const shelljs_1 = require("shelljs");
const shellHelpers_1 = require("./shellHelpers");
const fileUtils_1 = require("./fileUtils");
const program = new commander_1.Command();
program.version('1.0.0');
program.option('-t, --test', 'Tests commander.js implementation');
program.parse(process.argv);
const options = program.opts();
if (options.test) {
    console.log('Hello World!');
}
const questions = [
    { type: 'input', name: 'appName', message: 'Application name?' },
    { type: 'confirm', name: 'navigation', message: 'Add React Navigation?' },
    { type: 'confirm', name: 'redux', message: 'Add Redux?' },
];
inquirer_1.default
    .prompt(questions)
    .then(({ appName, navigation, redux }) => {
    npmUtils_1.createProject(appName);
    shelljs_1.cd(appName);
    npmUtils_1.installCoreDeps();
    if (navigation) {
        npmUtils_1.installNavigation();
    }
    if (redux) {
        npmUtils_1.installRedux();
    }
    shelljs_1.cd('ios');
    logger_1.log('Installing Pods');
    shellHelpers_1.runCommand('pod install');
    shelljs_1.cd('..');
    fileUtils_1.copyConfigFiles();
    npmUtils_1.runPrettier();
    logger_1.log("\n- Don't forget to add this to your Jest config in package.json!\n", 'error');
    logger_1.log(`"setupFiles": [
        "<rootDir>/jest.setup.js"
      ],
      "transformIgnorePatterns": [
        "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)"
      ],\n`, 'error');
    if (navigation) {
        logger_1.log("- Don't forget to add this at the top of your entry file!\n\nimport 'react-native-gesture-handler';\n", 'error');
    }
    logger_1.log('Added  tsconfig.json', 'success');
    logger_1.log('Added .prettierrc.js', 'success');
    logger_1.log('Added .eslintrc.js', 'success');
    logger_1.log('Added  jest.setup.js', 'success');
})
    .catch(error => {
    console.error(error);
    if (error.isTtyError) {
        // TODO: Handle error
    }
    else {
        // TODO: Handle error
    }
});
