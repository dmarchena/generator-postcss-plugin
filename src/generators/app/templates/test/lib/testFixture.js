import fs       from 'fs';
import postcss  from 'postcss';
import plugin   from '../../src';
import test     from 'ava';

function fixturePath(name) {
    return `fixtures/${name}.css`;
}

function readFixture(name) {
    return fs.readFileSync(fixturePath(name), 'utf8');
}

function deepEqualFixture(t, name, pluginOpts = {}, postcssOpts = {}) {
    postcssOpts.from = fixturePath(name);
    const expected = readFixture(`${name}.expected`);
    return postcss([plugin(pluginOpts)]).process(readFixture(name), postcssOpts)
        .then(result => {
            t.deepEqual(result.css, expected);
            t.deepEqual(result.warnings().length, 0);
        });
}

export default function(fixtureName) {
  test('Transforms fixture: ' + fixtureName, t => {
    return deepEqualFixture(t, fixtureName);
  });
}
