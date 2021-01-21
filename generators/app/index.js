"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = __importDefault(require("chalk"));
const yosay_1 = __importDefault(require("yosay"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const download_1 = __importDefault(require("./utils/download"));
const traverse_1 = __importDefault(require("./utils/traverse"));
class default_1 extends yeoman_generator_1.default {
    prompting() {
        this.log(yosay_1.default(`Welcome to the ${chalk_1.default.cyan('@lenconda/generator-react-app')} generator!`));
        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter the project name',
                default: 'project',
            },
            {
                type: 'input',
                name: 'template',
                message: 'Enter the template name from https://github.com/lenconda?q=yo-boilerplate-react&tab=repositories',
                default: 'typescript',
            },
        ];
        return this.prompt(questions).then((props) => this.props = props);
    }
    default() {
        const { name, template } = this.props;
        const destinationPath = path_1.default.resolve(process.cwd(), name);
        if (!name || !template) {
            this.log(chalk_1.default.red('Lost some parameters, please check'));
            process.exit(1);
        }
        if (fs_extra_1.default.existsSync(destinationPath)) {
            this.log(chalk_1.default.red('Cannot initialize a project into an existed directory'));
            process.exit(1);
        }
        this.destinationRoot(destinationPath);
    }
    async writing() {
        const githubRepositoryName = `github:lenconda/yo-boilerplate-react-${this.props.template}#master`;
        try {
            this.log(chalk_1.default.cyan(`Downloading template: ${githubRepositoryName}`));
            const duration = await download_1.default(githubRepositoryName, this.destinationPath());
            this.log(chalk_1.default.cyan(`Template downloaded at ${this.destinationPath()} in ${duration}ms`));
            this.log(chalk_1.default.cyan('Initializing template...'));
            traverse_1.default(this.destinationPath(), (pathname) => {
                this.fs.copyTpl(pathname, pathname.split('.template')[0], this.props);
                fs_extra_1.default.removeSync(pathname);
            }, /\.template$/);
        }
        catch (e) {
            console.log(e);
            this.log(chalk_1.default.red(e.message || e.toString()));
            process.exit(1);
        }
    }
    install() {
        this.log(chalk_1.default.cyan('Installing NPM dependencies...'));
        this.npmInstall();
    }
}
exports.default = default_1;
