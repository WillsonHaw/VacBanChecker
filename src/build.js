const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { minify } = require('uglify-js');

const outputFolder = 'dist';

const code = readFileSync(resolve(__dirname, 'vaccheck.js'), 'utf8');
const minified = minify(code);

if (minified.error) {
    console.error(minified.error);
    process.exit(1);
}

const wrapped = `javascript:(function(){${minified.code}})();`

if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder);
}

writeFileSync(resolve(outputFolder, 'vaccheck.min.js'), wrapped);
