'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-app:app general', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: true,
        preprocessor: 'original',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('package.json');
    assert.file('postcss.config.js');
    assert.file('.babelrc');
    assert.file('.eslintrc.js');
    assert.file('config/css_loaders.js');
    assert.file('config/env.config.js');
    assert.file('config/webpack.config.js');
    assert.file('src/templates/index.html');
  });

  it('creates package.json with name of "example"', () => {
    assert.jsonFileContent('package.json', { name: 'example' });
  });

  it('creates package.json with description of "example"', () => {
    assert.jsonFileContent('package.json', { description: 'example' });
  });

  it('creates package.json with repository of "git+example"', () => {
    assert.jsonFileContent('package.json', { repository: { type: 'git', url: 'git+example' } });
  });

  it('creates package.json with author of "lenconda"', () => {
    assert.jsonFileContent('package.json', { author: 'lenconda' });
  });

  it('creates package.json with license of "MIT"', () => {
    assert.jsonFileContent('package.json', { license: 'MIT' });
  });
});

describe('generator-react-app:app with TypeScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: true,
        preprocessor: 'original',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.tsx');
    assert.file('src/pages/Hello/index.tsx');
    assert.file('tsconfig.json');
  });

  it('uses @babel/typescript as preset', () => {
    assert.fileContent('.babelrc', /@babel\/typescript/);
  });

  it('contains @types-prefixed packages', () => {
    assert.fileContent('package.json', /@types/);
  });

  it('contains @typescript-eslint-prefixed dependencies in .eslintrc.js', () => {
    assert.fileContent('.eslintrc.js', /@typescript-eslint/);
  });
});

describe('generator-react-app:app with JavaScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: false,
        preprocessor: 'original',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.js');
    assert.file('src/pages/Hello/index.js');
  });

  it('does not generate tsconfig.json', () => {
    assert.noFile('tsconfig.json');
  });

  it('does not use @babel/typescript as preset', () => {
    assert.noFileContent('package.json', /@babel\/typescript/);
  });

  it('does not contains @type-prefixed packages', () => {
    assert.noFileContent('package.json', /@types/);
  });

  it('does not contains @typescript-eslint-prefixed dependencies in .eslintrc.js', () => {
    assert.noFileContent('.eslintrc.js', /@typescript-eslint/);
  });
});

describe('generator-react-app:app with CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: false,
        preprocessor: 'original',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.css');
    assert.file('src/pages/Hello/index.css');
  });

  it('ONLY uses css-loader', () => {
    assert.fileContent('config/css_loaders.js', /css-loader/);
    assert.noFileContent('config/css_loaders.js', /sass-loader/);
    assert.noFileContent('config/css_loaders.js', /less-loader/);
    assert.noFileContent('config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-app:app with Less', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: false,
        preprocessor: 'less',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.less');
    assert.file('src/pages/Hello/index.less');
  });

  it('uses less-loader', () => {
    assert.noFileContent('config/css_loaders.js', /sass-loader/);
    assert.fileContent('config/css_loaders.js', /less-loader/);
    assert.noFileContent('config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-app:app with Sass / Scss', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: false,
        preprocessor: 'scss',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.scss');
    assert.file('src/pages/Hello/index.scss');
  });

  it('uses sass-loader', () => {
    assert.fileContent('config/css_loaders.js', /sass-loader/);
    assert.noFileContent('config/css_loaders.js', /less-loader/);
    assert.noFileContent('config/css_loaders.js', /stylus-loader/);
  });
});

describe('generator-react-app:app with Stylus', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'example',
        description: 'example',
        repository: 'git+example',
        author: 'lenconda',
        typescript: false,
        preprocessor: 'styl',
        license: 'MIT'
      });
  });

  it('creates files', () => {
    assert.file('src/App.styl');
    assert.file('src/pages/Hello/index.styl');
  });

  it('uses stylus-loader', () => {
    assert.noFileContent('config/css_loaders.js', /sass-loader/);
    assert.noFileContent('config/css_loaders.js', /less-loader/);
    assert.fileContent('config/css_loaders.js', /stylus-loader/);
  });
});
