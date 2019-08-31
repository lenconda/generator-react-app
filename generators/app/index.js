'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');
const path = require('path');

const PREPROCESS_SASS = 'scss';
const PREPROCESS_LESS = 'less';
const PREPROCESS_STYLUS = 'styl';
const PREPROCESS_ORIGINAL = 'original';

const DEPENDENCIES_SASS = {
  devDependencies: {
    'sass-loader': '^7.1.0',
    'node-sass': '^4.12.0'
  }
};
const DEPENDENCIES_LESS = {
  devDependencies: {
    less: '^3.10.3',
    'less-loader': '^5.0.0'
  }
};
const DEPENDENCIES_STYLUS = {
  devDependencies: {
    stylus: '^0.54.7',
    'stylus-loader': '^3.0.2'
  }
};
const styleDependencies = {
  scss: DEPENDENCIES_SASS,
  less: DEPENDENCIES_LESS,
  styl: DEPENDENCIES_STYLUS
};

const typescriptDependencies = {
  devDependencies: {
    typescript: '3.2.4',
    '@types/react': '16.7.22',
    '@types/react-dom': '16.0.11',
    '@types/react-router': '^5.0.3',
    '@types/react-router-dom': '^4.3.4',
    '@typescript-eslint/eslint-plugin': '^1.13.0',
    '@typescript-eslint/parser': '^1.13.0'
  }
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-rate ${chalk.red(
          'generator-react-spa'
        )} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Input your project name',
        default: 'example'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Input your project description',
        default: ''
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Input your project git repository',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'Input author name',
        default: ''
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
      },
      {
        type: 'input',
        name: 'license',
        message: 'Input a license for the project',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named 
        ${this.props.name}\n
        The generator ${chalk.yellow(
    'will automatically create the folder in this directory'
  )}.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('common/package.json.tpl'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        repository: this.props.repository,
        license: this.props.license,
        description: this.props.description,
        author: this.props.author
      }
    );

    if (this.props.preprocessor !== 'original')
      this.fs.extendJSON(
        this.destinationPath('package.json'),
        styleDependencies[this.props.preprocessor]
      );

    this.fs.copy(
      this.templatePath('common/.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('common/postcss.config.js'),
      this.destinationPath('postcss.config.js')
    );
    this.fs.copy(
      this.templatePath('common/assets'),
      this.destinationPath('assets')
    );
    this.fs.copy(
      this.templatePath(
        (this.props.typescript ? 'typescript' : 'javascript') + '/.babelrc'
      ),
      this.destinationPath('.babelrc')
    );
    
    this.fs.copy(
      this.templatePath(
        (this.props.typescript ? 'typescript' : 'javascript') + '/.eslintrc.js'
      ),
      this.destinationPath('.eslintrc.js')
    );
    this.fs.copy(
      this.templatePath(
        (this.props.typescript ? 'typescript' : 'javascript') + '/src'
      ),
      this.destinationPath('src')
    );
    this.fs.copyTpl(
      this.templatePath('common/src/templates/index.html.tpl'),
      this.destinationPath('src/templates/index.html'),
      {
        name: this.props.name
      }
    );
    this.fs.copy(this.templatePath('common/src/config/env.config.js'), this.destinationPath('config/env.config.js'));
    this.fs.copy(
      this.templatePath(
        (this.props.typescript ? 'typescript' : 'javascript') + '/config'
      ),
      this.destinationPath('config')
    );
    this.fs.copy(this.templatePath('common/.eslintignore'), this.destinationPath('.eslintignore'));

    if (this.props.typescript) {
      this.fs.copy(
        this.templatePath('typescript/tsconfig.json'),
        this.destinationPath('tsconfig.json')
      );

      this.fs.extendJSON('package.json', typescriptDependencies);
    }

    if (this.props.preprocessor !== 'original') {
      this.fs.copyTpl(
        this.templatePath(
          'common/src/App.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'
        ),
        this.destinationPath(
          'src/App.' + (this.props.typescript ? 'tsx' : 'js')
        ),
        {
          extension: this.props.preprocessor
        }
      );
      this.fs.copyTpl(
        this.templatePath(
          'common/src/pages/Hello/index.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'
        ),
        this.destinationPath('src/pages/Hello/index.' + (this.props.typescript ? 'tsx' : 'js')),
        {
          extension: this.props.preprocessor
        }
      );
      this.fs.copy(
        this.templatePath('common/src/pages/Hello/index.' + this.props.preprocessor),
        this.destinationPath('src/pages/Hello/index.' + this.props.preprocessor)
      );
      this.fs.copy(
        this.templatePath('common/src/App.' + this.props.preprocessor),
        this.destinationPath('src/App.' + this.props.preprocessor)
      );
      this.fs.copy(
        this.templatePath(
          'common/src/config/' + this.props.preprocessor + '_loader.js'
        ),
        this.destinationPath('config/css_loaders.js')
      );
    } else {
      this.fs.copyTpl(
        this.templatePath(
          'common/src/App.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'
        ),
        this.destinationPath(
          'src/App.' + (this.props.typescript ? 'tsx' : 'js')
        ),
        {
          extension: 'css'
        }
      );
      this.fs.copyTpl(
        this.templatePath(
          'common/src/pages/Hello/index.' + (this.props.typescript ? 'tsx' : 'js') + '.tpl'
        ),
        this.destinationPath('src/pages/Hello/index.' + (this.props.typescript ? 'tsx' : 'js')),
        {
          extension: 'css'
        }
      );
      this.fs.copy(
        this.templatePath('common/src/pages/Hello/index.css'),
        this.destinationPath('src/pages/Hello/index.css')
      );
      this.fs.copy(
        this.templatePath('common/src/App.css'),
        this.destinationPath('src/App.css')
      );
      this.fs.copy(
        this.templatePath('common/src/config/css_loader.js'),
        this.destinationPath('config/css_loaders.js')
      );
    }
  }

  install() {
    this.log('\nInstall dependencies...\n');
    this.npmInstall();
  }
};
