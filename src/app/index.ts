import Generator, { Questions } from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import fs from 'fs-extra';
import path from 'path';
import download from './utils/download';
import traverse from './utils/traverse';

interface AppGeneratorAnswer {
  name: string;
  template: string;
}

export default class extends Generator {
  // eslint-disable-next-line prettier/prettier
  private props: AppGeneratorAnswer;

  prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.cyan(
          '@lenconda/generator-react-app'
        )} generator!`
      )
    );

    const questions: Questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Enter the project name',
        default: 'project',
      },
      {
        type: 'input',
        name: 'template',
        message:
          'Enter the template name from https://github.com/lenconda?q=yo-boilerplate-react&tab=repositories',
        default: 'typescript',
      },
    ];

    return this.prompt(questions).then((props: AppGeneratorAnswer) => this.props = props);
  }

  default() {
    const { name, template } = this.props;
    const destinationPath = path.resolve(process.cwd(), name);

    if (!name || !template) {
      this.log(chalk.red('Lost some parameters, please check'));
      process.exit(1);
    }

    if (fs.existsSync(destinationPath)) {
      this.log(chalk.red('Cannot initialize a project into an existed directory'));
      process.exit(1);
    }

    this.destinationRoot(destinationPath);
  }

  async writing() {
    const githubRepositoryName = `github:lenconda/yo-boilerplate-react-${this.props.template}#master`;

    try {
      this.log(chalk.cyan(`Downloading template: ${githubRepositoryName}`));
      const duration = await download(githubRepositoryName, this.destinationPath());
      this.log(chalk.cyan(`Template downloaded at ${this.destinationPath()} in ${duration}ms`));

      this.log(chalk.cyan('Initializing template...'));
      traverse(this.destinationPath(), (pathname: string) => {
        this.fs.copyTpl(pathname, pathname.split('.template')[0], this.props);
        fs.removeSync(pathname);
      }, /\.template$/);
    } catch (e) {
      console.log(e);
      this.log(chalk.red(e.message || e.toString()));
      process.exit(1);
    }
  }

  install() {
    this.log(chalk.cyan('Installing NPM dependencies...'));
    this.npmInstall();
  }
}
