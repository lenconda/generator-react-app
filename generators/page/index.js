'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

const PREPROCESS_SASS = 'scss';
const PREPROCESS_LESS = 'less';
const PREPROCESS_STYLUS = 'styl';
const PREPROCESS_ORIGINAL = 'css';

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input your page name',
        default: 'example'
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Would you like to use TypeScript?',
        default: true
      },
      {
        type: 'list',
        name: 'preprocessor',
        message: 'Which CSS preprocessor would you like to choose?',
        choices: [
          { value: PREPROCESS_ORIGINAL, name: 'Original CSS' },
          { value: PREPROCESS_SASS, name: 'Sass / Scss' },
          { value: PREPROCESS_LESS, name: 'Less' },
          { value: PREPROCESS_STYLUS, name: 'Stylus' }
        ],
        default: PREPROCESS_ORIGINAL
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    const pageName = this.props.name.toLowerCase().replace(/^\S/, s => s.toUpperCase());
    mkdirp(pageName);
    this.destinationRoot(process.cwd() + '/' + pageName);
  }

  writing() {
    const pageName = this.props.name.toLowerCase().replace(/^\S/, s => s.toUpperCase());
    
    this.fs.copyTpl(
      this.templatePath('index.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'),
      this.destinationPath('index.' + (this.props.typescript ? 'tsx' : 'js')),
      {
        name: this.props.name.toLowerCase(),
        pageName,
        preprocessor: this.props.preprocessor
      }
    )

    this.fs.copy(this.templatePath('common/index.style.tpl'), this.destinationPath('index.' + this.props.preprocessor));
  }
};
