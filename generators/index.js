'use strict';

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yeomanGenerator = require('yeoman-generator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PostcssPluginGenerator extends _yeomanGenerator.Base {

  initializing() {
    this.composeWith('postcss-plugin:app');
    this.composeWith('postcss-plugin:license');
  }

  configuring() {
    const config = this.config.getAll();
    if (_path2.default.basename(this.destinationPath()) !== config.pluginName) {
      this.log('Your generator must be inside a folder named ' + config.pluginName + '\n' + 'I\'ll automatically create this folder.');
      (0, _mkdirp2.default)(config.pluginName);
      this.destinationRoot(this.destinationPath(config.pluginName));
    }
  }

  install() {
    this.installDependencies();
  }

}

module.exports = PostcssPluginGenerator;