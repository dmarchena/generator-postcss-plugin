import Generator from 'yeoman-generator';

const licenses = [{
  name: 'MIT',
  value: 'MIT'
}, {
  name: 'Apache 2.0',
  value: 'Apache-2.0'
}, {
  name: 'GNU General Public License v3.0',
  value: 'GNU-GPLv3'
}, {
  name: 'BSD 2-clause "Simplified" License',
  value: 'BSD-2-Clause'
}, {
  name: 'BSD 3-clause "New" or "Revised" License',
  value: 'BSD-3-Clause'
}, {
  name: 'ISC',
  value: 'ISC'
}, {
  name: 'Unlicense',
  value: 'unlicense'
}, {
  name: 'None (Copyrighted)',
  value: 'nolicense'
}];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const prompts = [
      {
        type: 'list',
        name: 'license',
        message: 'Which license do you want to use?',
        default: 0,
        choices: licenses
      }
    ];

    if (!this.config.get('author')) {
      prompts.push(
        {
          type: 'input',
          name: 'author',
          message: 'Name of the license owner:',
        }
      )
    }

    if (!this.config.get('pluginName')) {
      prompts.push(
        {
          type: 'input',
          name: 'pluginName',
          message: 'Name of the licensed program:',
        }
      )
    }
    return this.prompt(prompts).then(answers => {
      answers = Object.assign({}, this.config.getAll(), answers);
      this.config.set(answers);
    });
  }

  configuring() {
    this.config.set('licenseOwner', this.config.get('author'));
    this.config.set('licenseProgram', this.config.get('pluginName'));
    this.config.set('licenseYear', (new Date()).getFullYear());
  }

  writing() {
    // License file
    const config = this.config.getAll();
    const licenseFile = config.license + '.txt';
    const noticeFile = config.license + '.notice.txt';
    const licenseOwner = config.licenseOwner.trim();
    const licenseProgram = config.licenseProgram.trim();
    const licenseYear = config.licenseYear;

    this.fs.copyTpl(
      this.templatePath(licenseFile),
      this.destinationPath('LICENSE'),
      {
        year: licenseYear,
        author: licenseOwner
      }
    );

    // Notice
    if (this.fs.exists(this.templatePath(noticeFile))) {
      this.fs.copyTpl(
        this.templatePath(noticeFile),
        this.destinationPath('NOTICE'),
        {
          year: licenseYear,
          author: licenseOwner,
          program: licenseProgram
        }
      );
    }

    // Package.json
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    pkg.license = config.license;

    // Avoid publishing the module to NPM if its copyrighted
    if (config.license === 'nolicense') {
      delete pkg.license;
      pkg.private = true;
    }

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
};
