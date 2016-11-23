import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
import path from 'path';
import {license as generator} from './config';

describe('generator-postcss-plugin:license', () => {
  describe('MIT (default)', () => {
    before(() => {
      return helpers.run(path.join(__dirname, generator.src))
        .withPrompts(generator.prompts)
        .withOptions(generator.options)
        .toPromise();
    });

    it('creates files', () => {
      assert.file([
        'LICENSE',
        'package.json'
      ]);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        license: 'MIT'
      });
    });

    it('fills LICENSE with correct information', () => {
      const owner = generator.options.owner;
      const year = (new Date()).getFullYear();
      assert.fileContent('LICENSE', 'MIT License');
      assert.fileContent('LICENSE', 'Copyright (c) ' + year + ' ' + owner);
    });
  });

  describe('GNU-GPLv3', () => {
    before(() => {
      return helpers.run(path.join(__dirname, generator.src))
        .withPrompts(Object.assign({}, generator.prompts, {
          license: 'GNU-GPLv3'
        }))
        .withOptions(generator.options)
        .toPromise();
    });

    it('creates files', () => {
      assert.file([
        'LICENSE',
        'NOTICE',
        'package.json'
      ]);
    });

    it('fills LICENSE with correct information', () => {
      const owner = generator.options.owner;
      const year = (new Date()).getFullYear();
      assert.fileContent('LICENSE', 'GNU GENERAL PUBLIC LICENSE');
      assert.fileContent('NOTICE', generator.options.program);
      assert.fileContent('NOTICE', 'Copyright (C) ' + year + '  ' + owner);
    });
  });

  describe('nolicense', () => {
    before(() => {
      return helpers.run(path.join(__dirname, generator.src))
        .withPrompts(Object.assign({}, generator.prompts, {
          license: 'nolicense'
        }))
        .withOptions(generator.options)
        .toPromise();
    });

    it('creates files', () => {
      assert.file([
        'LICENSE',
        'package.json'
      ]);
    });

    it('fills package.json with correct information', () => {
      // eslint-disable-next-line new-cap
      assert.JSONFileContent('package.json', {
        private: true
      });
    });
  });
});
