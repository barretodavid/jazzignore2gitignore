"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
function extractIgnorePatterns(awkString) {
    var awkArray = awkString.split('\n').slice(0, -1);
    var ignore = awkArray.reduce(function (ignore, curr) {
        var _a = curr.split(','), label = _a[0], values = _a.slice(1);
        if (label == 'recursive') {
            return __assign({}, ignore, { recursive: values });
        }
        else {
            return __assign({}, ignore, { plain: values });
        }
    }, { plain: [], recursive: [] });
    return ignore;
}
exports.extractIgnorePatterns = extractIgnorePatterns;
function createGitignoreFile(path, ignorePatterns) {
    var logger = fs_1.createWriteStream(path_1.join(path, '.gitignore'), { flags: 'w' });
    ignorePatterns.recursive.forEach(function (pattern) {
        logger.write("**/" + pattern + "\n");
    });
    ignorePatterns.plain.forEach(function (pattern) {
        logger.write(pattern);
    });
    logger.end();
}
exports.createGitignoreFile = createGitignoreFile;
