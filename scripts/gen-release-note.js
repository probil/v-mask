/* eslint-disable strict,no-console */

'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const cc = require('conventional-changelog');
const fs = require('fs');

const version = process.argv[2] || process.env.VERSION;
const file = `./RELEASE_NOTE${version ? `_${version}` : ''}.md`;
const fileStream = fs.createWriteStream(file);

cc({
  preset: 'angular',
  pkg: {
    transform(pkg) {
      return { ...pkg, version: `v${version}` };
    },
  },
}).pipe(fileStream)
  .on('close', () => {
    console.log(`Generated release note at ${file}`);
  });
