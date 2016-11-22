import askName from 'inquirer-npm-name';
import chalk from 'chalk';
import gitConfig from 'git-config';
import mkdirp from 'mkdirp';
import path from 'path';
import {Base} from 'yeoman-generator';
import yosay from 'yosay';
import _ from 'lodash';

const files = [
  'editorconfig',
  '_package.json'
];

function makePluginName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('postcss-') === 0 ? name : 'postcss-' + name;
  return name;
}

class PostcssPluginApp extends Base {

  constructor(...args) {
    super(...args);

    this.option('pluginName', {
      type: String,
      desc: 'Your PostCSS plugin name',
      default: makePluginName(path.basename(process.cwd()))
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
    this.githubConfig = gitConfig.sync();
    this.githubConfig.user = this.githubConfig.user || {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the legendary ' + chalk.red('generator-postcss-plugin') + ' generator!'
    ));

    return askName({
      name: 'pluginName',
      message: 'Your PostCSS plugin name',
      filter: makePluginName,
      default: this.options.pluginName,
      validate(str) {
        return str.length > 'postcss-'.length;
      }
    }, this)
      .then(answers => {
        this.config.set('pluginName', makePluginName(answers.pluginName));
      })
      .then(() => this.prompt(
        [{
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
          default: answers => 'https://github.com/' +
            answers.author + '/' +
            this.config.get('pluginName')
        }]
      ))
      .then(answers => {
        this.config.set(answers);
      });
  }

  configuring() {
    this.config.save();
  }

  writing() {
    files.map(file => {
      const destFile = (file.charAt(0) === '_')
        ? file.substring(1)
        : '.' + file;
      this.template(file, destFile, this.config.getAll());
      return destFile;
    });
  }

  install() {
    this.installDependencies();
  }

}

module.exports = PostcssPluginApp;
