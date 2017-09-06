import mkdirp from 'mkdirp';
import path from 'path';
import Generator from 'yeoman-generator';

module.exports = class PostcssPluginGenerator extends Generator {
  initializing() {
    this.composeWith('postcss-plugin:app');
    this.composeWith('postcss-plugin:license');
  }

  configuring() {
    const config = this.config.getAll();
    if (path.basename(this.destinationPath()) !== config.pluginName) {
      this.log(
        'Your generator must be inside a folder named ' + config.pluginName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(config.pluginName, err => {
        if (err) {
          console.error(err);
        } else {
          this.destinationRoot(this.destinationPath(config.pluginName));
        }
      });
    }
  }
};
