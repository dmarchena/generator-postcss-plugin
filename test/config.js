const basePath = '../src/generators/';

export const app = {
  src: basePath + 'app',
  prompts: {
    pluginName: 'plugin-boilerplate',
    pluginDescription: 'PostCSS plugin boilerplate generated with generator-postcss-plugin',
    author: 'Mocha'
  },
  options: {}
};

export const license = {
  src: basePath + 'license',
  prompts: {
    license: 'MIT'
  },
  options: {
    owner: 'Mystery Man',
    program: 'Mystery Program'
  }
};
