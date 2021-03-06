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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var find = __importStar(require("find"));
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
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
function createGitignoreFile(path, ignorePatterns) {
    var logger = fs_1.createWriteStream(path + "/.gitignore", { flags: 'w' });
    ignorePatterns.recursive.forEach(function (pattern) {
        logger.write("**/" + pattern + "\n");
    });
    ignorePatterns.plain.forEach(function (pattern) {
        logger.write(pattern);
    });
    logger.end();
}
function main() {
    find.file('.jazzignore', '../StreamP3/', function (files) {
        files.map(function (file) {
            var path = path_1.dirname(file);
            var parser = path_1.join(__dirname, 'parser.awk');
            var awk = child_process_1.exec("awk -f " + parser + " '" + file + "'");
            awk.stdout.on('data', function (awkString) {
                var ignorePatterns = extractIgnorePatterns(awkString);
                createGitignoreFile(path, ignorePatterns);
            });
        });
    });
}
main();
