"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var command_line_args_1 = __importDefault(require("command-line-args"));
var command_line_usage_1 = __importDefault(require("command-line-usage"));
var optionDefinitions = [
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this usage guide',
    },
    {
        name: 'path',
        alias: 'p',
        type: String,
        description: 'Path to recursively find .jazzignore files',
        defaultOption: true,
    },
];
exports.userOptions = command_line_args_1.default(optionDefinitions);
exports.helpMessage = command_line_usage_1.default([
    {
        header: 'jazz2git',
        content: 'A script to create .gitignore files from .jazzignore files'
    },
    {
        header: 'Options',
        optionList: optionDefinitions
    },
    {
        content: 'Project home: {underline https://github.com/barretodavid/jazzignore2gitignore}'
    }
]);
