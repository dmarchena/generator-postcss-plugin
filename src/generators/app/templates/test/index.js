import fs from 'fs';
import test from './lib/testFixture';

function fixtures() {
  let files = fs.readdirSync('fixtures');
  return files.filter(item => item.indexOf('.expected') === -1)
    .map(item => item.substr(0, item.indexOf('.')));
}

fixtures().map(fixture => test(fixture));