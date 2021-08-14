#!/usr/bin/env ts-node

import chalk from 'chalk';

const logColorMap = {
  info: chalk.yellow,
  success: chalk.green,
  error: chalk.red,
} as const;

type LogType = keyof typeof logColorMap;

export const log = (msg: string, type: LogType = 'info') => {
  console.log(logColorMap[type](msg));
};
