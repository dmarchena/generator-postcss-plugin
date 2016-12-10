import {Base} from 'yeoman-generator';

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

module.exports = Base.extend({
  constructor() {
    Base.apply(this, arguments);

    this.option('owner', {
      desc: 'Name of the license owner'
    });

    this.option('program', {
      desc: 'Name of the licensed program'
    });

    this.option('year', {
      desc: 'Year(s) to include on the license',
      default: (new Date()).getFullYear()
    });

    this.option('license', {
      desc: 'License',
      default: 'MIT'
    });
  },

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

    return this.prompt(prompts).then(answers => {
      answers = Object.assign({}, this.options, answers);
      this.config.set(answers);
    });
  },

  configuring() {
    const licenseOwner = this.options.owner || this.config.get('author');
    const licenseProgram = this.options.program || this.config.get('pluginName');
    this.config.set('licenseOwner', licenseOwner);
    this.config.set('licenseProgram', licenseProgram);
  },

  writing() {
    // License file
    const config = this.config.getAll();
    const licenseFile = config.license + '.txt';
    const noticeFile = config.license + '.notice.txt';
    const licenseOwner = config.licenseOwner.trim();
    const licenseProgram = config.licenseProgram.trim();

    this.fs.copyTpl(
      this.templatePath(licenseFile),
      this.destinationPath('LICENSE'),
      {
        year: this.options.year,
        author: licenseOwner
      }
    );

    // Notice
    if (this.fs.exists(this.templatePath(noticeFile))) {  
      this.fs.copyTpl(
        this.templatePath(noticeFile),
        this.destinationPath('NOTICE'),
        {
          year: this.options.year,
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
});
