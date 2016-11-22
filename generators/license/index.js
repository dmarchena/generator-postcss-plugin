'use strict';

var _yeomanGenerator = require('yeoman-generator');

const licenses = [{
  name: 'Apache 2.0',
  value: 'Apache-2.0'
}, {
  name: 'FreeBSD',
  value: 'BSD-2-Clause-FreeBSD'
}, {
  name: 'Internet Systems Consortium (ISC)',
  value: 'ISC'
}, {
  name: 'MIT',
  value: 'MIT'
}, {
  name: 'NewBSD',
  value: 'BSD-3-Clause'
}, {
  name: 'No License (Copyrighted)',
  value: 'nolicense'
}, {
  name: 'Unlicense',
  value: 'unlicense'
}];

class PostcssPluginLicense extends _yeomanGenerator.Base {

  constructor() {
    super(...arguments);

    this.option('owner', {
      desc: 'Name of the license owner'
    });

    this.option('year', {
      desc: 'Year(s) to include on the license',
      default: new Date().getFullYear()
    });

    this.option('license', {
      desc: 'License',
      default: 'MIT'
    });
  }

  prompting() {
    const prompts = [{
      type: 'list',
      name: 'license',
      message: 'Which license do you want to use?',
      default: 3,
      choices: licenses
    }];

    return this.prompt(prompts).then(answers => {
      answers = Object.assign({}, this.options, answers);
      this.config.set(answers);
    });
  }

  configuring() {
    const owner = this.options.owner || this.config.get('author');
    this.config.set('owner', owner);
  }

  writing() {
    // License file
    const config = this.config.getAll();
    const filename = config.license + '.txt';
    const owner = config.owner.trim();

    this.fs.copyTpl(this.templatePath(filename), this.destinationPath('LICENSE'), {
      year: this.options.year,
      author: owner
    });

    // Package.json
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.license = config.license;

    // We don't want users to publish their module to NPM if they copyrighted
    // their content.
    if (config.license === 'nolicense') {
      delete pkg.license;
      pkg.private = true;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
}

module.exports = PostcssPluginLicense;