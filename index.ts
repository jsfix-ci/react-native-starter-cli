#!/usr/bin/env ts-node

import { Command } from 'commander';
import inquirer, { QuestionCollection } from 'inquirer';
import { log } from './logger';
import {
  createProject,
  installCoreDeps,
  installNavigation,
  installRedux,
  runPrettier,
} from './npmUtils';
import { cd } from 'shelljs';
import { runCommand } from './shellUtils';
import { copyConfigFiles } from './fileUtils';

const program = new Command();

program.version('1.0.0');

program.option('-t, --test', 'Tests commander.js implementation');

program.parse(process.argv);

const options = program.opts();

if (options.test) {
  console.log('Hello World!');
}

type RnProjectQuestions = {
  appName: string;
  navigation: boolean;
  redux: boolean;
};

const questions: QuestionCollection<RnProjectQuestions> = [
  { type: 'input', name: 'appName', message: 'Application name?' },
  { type: 'confirm', name: 'navigation', message: 'Add React Navigation?' },
  { type: 'confirm', name: 'redux', message: 'Add Redux?' },
];

inquirer
  .prompt<RnProjectQuestions>(questions)
  .then(({ appName, navigation, redux }) => {
    createProject(appName);

    cd(appName);

    installCoreDeps();

    if (navigation) {
      installNavigation();
    }

    if (redux) {
      installRedux();
    }

    cd('ios');
    log('Installing Pods');
    runCommand('pod install');
    cd('..');

    copyConfigFiles();

    runPrettier();

    log(
      "\n- Don't forget to add this to your Jest config in package.json!\n",
      'error',
    );

    log(
      `"setupFiles": [
        "<rootDir>/jest.setup.js"
      ],
      "transformIgnorePatterns": [
        "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)"
      ],\n`,
      'error',
    );

    if (navigation) {
      log(
        "- Don't forget to add this at the top of your entry file!\n\nimport 'react-native-gesture-handler';\n",
        'error',
      );
    }

    log('Added  tsconfig.json', 'success');
    log('Added .prettierrc.js', 'success');
    log('Added .eslintrc.js', 'success');
    log('Added  jest.setup.js', 'success');
  })
  .catch(error => {
    console.error(error);
    if (error.isTtyError) {
      // TODO: Handle error
    } else {
      // TODO: Handle error
    }
  });
