/**
 * @file src/app/index.ts
 * @author lenconda <i@lenconda.top>
 * @description this is the entry file for @lenconda/generator-react-app scaffold
 *
 * For many reasons, the generator will be able to access all of the react boilerplate
 * at https://github.com/lenconda?q=yo-boilerplate-react&tab=repositories, otherwise we can
 * make the most little modification to this generator itself.
 *
 * So we made decisions to ask users to enter their favorite boilerplate's name, and then
 * download it form GitHub.
 *
 * For details, please read https://github.com/lenconda/generator-react-app#readme
 */

import Generator, { Questions } from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import download from './utils/download';
import traverse from './utils/traverse';
import { getGitHubCodeContent } from './utils/github';

interface AppGeneratorAnswer {
  name: string;
  template: string;
  [key: string]: string;
}

export default class extends Generator {
  // eslint-disable-next-line prettier/prettier
  private props: AppGeneratorAnswer;

  async prompting() {
    this.log(
      yosay(
        `Welcome to the ${chalk.cyan(
          '\n@lenconda/react-app\n'
        )} generator!`
      )
    );

    try {
      // default and essential questions
      // it is hard-coded in the generator, DO NOT MODIFY IT
      const defaultQuestions: Questions = [
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

      // get props from user's input
      const props = await this.prompt(defaultQuestions) as AppGeneratorAnswer;

      // read remote boilerplate's .question.json
      this.log(chalk.cyan('Reading template...'));
      const boilerplateQuestionsString =
        await getGitHubCodeContent(
          `https://github.com/lenconda/yo-boilerplate-react-${props.template}/blob/8511ea536fc63bc3d3d78e764d03742fda7249e0/.questions.json`
        );

      const boilerplateProps = boilerplateQuestionsString
        ? await this.prompt(JSON.parse(boilerplateQuestionsString))
        : {};

      const generatorProps = _.merge({}, props, boilerplateProps);
      this.props = generatorProps;
    } catch (e) {
      this.log(chalk.red(e.message || e.toString()));
      process.exit(1);
    }
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
      traverse(this.destinationPath(), /\.template$/, (pathname: string) => {
        this.fs.copyTpl(pathname, pathname.split('.template')[0], this.props);
        fs.removeSync(pathname);
      });
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
