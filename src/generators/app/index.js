import askName from 'inquirer-npm-name';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import path from 'path';
import yeoman from 'yeoman-generator';
import yosay from 'yosay';
import _ from 'lodash';

const files = [
  '_package.json'
];

function makePluginName(name) {
  name = _.kebabCase(name);
  name = name.indexOf('postcss-') === 0 ? name : 'postcss-' + name;
  return name;
}

function required(type) {
  return function (value) {
    return value.length ? true : 'You must provide a ' + type + '!';
  };
}

module.exports = yeoman.Base.extend({
  initializing() {
    this.props = {};
  },

  promptingName() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the legendary ' + chalk.red('generator-postcss-plugin') + ' generator!'
    ));

    return askName({
      name: 'name',
      message: 'Your PostCSS plugin name',
      default: makePluginName(path.basename(process.cwd())),
      validate(str) {
        return str.length > 'postcss-'.length;
      }
    }, this)
      .then(props => {
        this.props.name = makePluginName(props.name);
      })
      .then(() => this.prompt(
        [{
          name: 'description',
          message: 'Plugin description:',
          default: 'PostCSS plugin generated with generator-postcss-plugin'
        }, {
          name: 'githubName',
          message: 'GitHub username:',
          store: true,
          validate: required('GitHub username')
        }, {
          name: 'authorUrl',
          message: 'Your homepage:',
          store: true,
          default: props => {
            return 'https://github.com/' +
              props.githubName + '/' +
              props.pluginName;
          }
        }]
      ))
      .then(props => {
        props.author = props.githubName;
        Object.assign(this.props, props);
      });
  },

  promptingOpts() {
  },

  makingPluginDir() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  },

  composing() {
    this.composeWith('postcss-plugin:editorconfig', {
      indentation: 's',
      size: 2
    }, {
      local: require.resolve('generator-editorconfig')
    });
  },

  writing() {
    files.map(file => {
      const destFile = (file.charAt(0) === '_')
        ? file.substring(1)
        : '.' + file;
      this.template(file, destFile, this.props);
      return destFile;
    });
  },

  install() {
    this.installDependencies();
  }
});
