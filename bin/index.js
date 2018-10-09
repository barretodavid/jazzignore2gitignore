#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var find = __importStar(require("find"));
var path_1 = require("path");
var child_process_1 = require("child_process");
var command_line_1 = require("./command-line");
var utils_1 = require("./utils");
if (command_line_1.userOptions.help) {
    console.log(command_line_1.helpMessage);
}
else {
    find.file('.jazzignore', command_line_1.userOptions.path, function (files) {
        files.map(function (file) {
            var path = path_1.dirname(file);
            var parser = path_1.join(__dirname, 'parser.awk');
            var awk = child_process_1.exec("awk -f " + parser + " '" + file + "'");
            awk.stdout.on('data', function (awkString) {
                var ignorePatterns = utils_1.extractIgnorePatterns(awkString);
                utils_1.createGitignoreFile(path, ignorePatterns);
            });
        });
    });
}
