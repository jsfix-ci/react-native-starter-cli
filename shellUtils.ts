#!usr/bin/env ts-node

import shell, { ShellString } from 'shelljs';
import { log } from './logger';

const logInstallOutput = ({ code, stdout, stderr }: ShellString) => {
  if (code !== 0) {
    log(`Oops! Something went wrong...\n\n${stderr}`, 'error');
    shell.exit(code);
  } else {
    log(
      stdout
        .split('\n')
        .filter(line => line.startsWith('+'))
        .map(line => `Installed ${line.replace('+', '').trim()}`)
        .join('\n'),
      'success',
    );
  }
};

export const runInstallCommand = (command: string) => {
  logInstallOutput(shell.exec(command, { silent: true }));
};

export const runCommand = (command: string) =>
  shell.exec(command, { silent: true });
