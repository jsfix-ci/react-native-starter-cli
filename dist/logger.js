#!/usr/bin/env ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logColorMap = {
    info: chalk_1.default.yellow,
    success: chalk_1.default.green,
    error: chalk_1.default.red,
};
const log = (msg, type = 'info') => {
    console.log(logColorMap[type](msg));
};
exports.log = log;
