'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-react-app:page with TypeScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: true,
        preprocessor: 'original'
      });
  });

  it('creates files', () => {
    assert.file('index.tsx');
  });
});

describe('generator-react-app:page with JavaScript', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: false,
        preprocessor: 'original'
      });
  });

  it('creates files', () => {
    assert.file('index.js');
  });
});

describe('generator-react-app:page with CSS', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: false,
        preprocessor: 'css'
      });
  });

  it('creates files', () => {
    assert.file('index.css');
  });
});

describe('generator-react-app:page with Less', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: false,
        preprocessor: 'less'
      });
  });

  it('creates files', () => {
    assert.file('index.less');
  });
});

describe('generator-react-app:page with Sass / Scss', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: false,
        preprocessor: 'scss'
      });
  });

  it('creates files', () => {
    assert.file('index.scss');
  });
});

describe('generator-react-app:page with Stylus', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/page'))
      .withPrompts({
        name: 'example',
        typescript: false,
        preprocessor: 'styl'
      });
  });

  it('creates files', () => {
    assert.file('index.styl');
  });
});
