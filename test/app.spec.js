import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import mockery from 'mockery';
import Promise from 'pinkie-promise';

describe('generator-postcss-plugin:app', () => {
  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    mockery.registerMock('npm-name', () => {
      return Promise.resolve(true);
    });
  });

  after(() => {
    mockery.disable();
  });

  describe('defaults', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/generators/app'))
        .withPrompts({
          name: 'plugin-boilerplate',
          description: 'PostCSS plugin boilerplate generated with generator-postcss-plugin',
          githubName: 'Mocha'
        })
        .toPromise();
    });

    it('created and CD into a folder named like the plugin', () => {
      assert.equal(path.basename(process.cwd()), 'postcss-plugin-boilerplate');
    });

    it('creates files', () => {
      assert.file([
        '.editorconfig',
        'package.json'
      ]);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        name: 'postcss-plugin-boilerplate',
        description: 'PostCSS plugin boilerplate generated with generator-postcss-plugin',
        author: 'Mocha'
      });
    });
  });
});
