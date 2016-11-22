import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import mockery from 'mockery';
import Promise from 'pinkie-promise';
import {app as generator} from './config';

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
      return helpers.run(path.join(__dirname, generator.src))
        .withPrompts(generator.prompts)
        .withOptions(generator.options)
        .toPromise();
    });

    /* it('created and CD into a folder named like the plugin', () => {
      assert.equal(path.basename(process.cwd()), 'postcss-plugin-boilerplate');
    }); */

    it('creates files', () => {
      assert.file([
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
