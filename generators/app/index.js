'use strict';

var _inquirerNpmName = require('inquirer-npm-name');

var _inquirerNpmName2 = _interopRequireDefault(_inquirerNpmName);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _gitConfig = require('git-config');

var _gitConfig2 = _interopRequireDefault(_gitConfig);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require('yeoman-generator');

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const files = ['editorconfig', '_package.json'];

function makePluginName(name) {
  name = _lodash2.default.kebabCase(name);
  name = name.indexOf('postcss-') === 0 ? name : 'postcss-' + name;
  return name;
}

class PostcssPluginApp extends _yeomanGenerator.Base {

  constructor() {
    super(...arguments);

    this.option('pluginName', {
      type: String,
      desc: 'Your PostCSS plugin name',
      default: makePluginName(_path2.default.basename(process.cwd()))
    });

    this.option('pluginDescription', {
      type: String,
      desc: 'Plugin description',
      default: 'PostCSS plugin generated with generator-postcss-plugin'
    });

    this.option('author', {
      type: String,
      desc: 'Package Author'
    });

    this.option('email', {
      type: String,
      desc: 'Author\'s email'
    });
  }

  initializing() {
    this.githubConfig = _gitConfig2.default.sync();
    this.githubConfig.user = this.githubConfig.user || {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the legendary ' + _chalk2.default.red('generator-postcss-plugin') + ' generator!'));

    return (0, _inquirerNpmName2.default)({
      name: 'pluginName',
      message: 'Your PostCSS plugin name',
      filter: makePluginName,
      default: this.options.pluginName,
      validate: function validate(str) {
        return str.length > 'postcss-'.length;
      }
    }, this).then(answers => {
      this.config.set('pluginName', makePluginName(answers.pluginName));
    }).then(() => this.prompt([{
      name: 'pluginDescription',
      message: 'Plugin description:',
      default: this.options.pluginDescription
    }, {
      name: 'author',
      message: 'GitHub username:',
      default: this.options.author || this.githubConfig.user.name,
      store: true
    }, {
      name: 'email',
      message: 'Email:',
      default: this.options.email || this.githubConfig.user.email,
      store: true
    }, {
      name: 'authorUrl',
      message: 'Your homepage:',
      default: answers => 'https://github.com/' + answers.author + '/' + this.config.get('pluginName')
    }])).then(answers => {
      this.config.set(answers);
    });
  }

  configuring() {
    this.config.save();
  }

  writing() {
    files.map(file => {
      const destFile = file.charAt(0) === '_' ? file.substring(1) : '.' + file;
      this.template(file, destFile, this.config.getAll());
      return destFile;
    });
  }

  install() {
    this.installDependencies();
  }

}

module.exports = PostcssPluginApp;