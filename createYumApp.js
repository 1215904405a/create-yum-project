/**
 * Copyright (c) wangyong, Inc.
 * 
 */

'use strict';

const chalk = require('chalk');
const commander = require('commander');
const envinfo = require('envinfo');
const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const hyperquest = require('hyperquest');
const prompts = require('prompts');
const os = require('os');
const path = require('path');
const semver = require('semver');
const spawn = require('cross-spawn');
const tmp = require('tmp');
const unpack = require('tar-pack').unpack;
const url = require('url');
const validateProjectName = require('validate-npm-package-name');

const packageJson = require('./package.json');

function isUsingYarn() {
  return (process.env.npm_config_user_agent || '').indexOf('yarn') === 0;
}

let projectName; // 新建项目名称

function init() {
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>') // 可以一次性指定多个参数，但不包含参数描述, 这里是新建的项目名称
    .usage(`${chalk.green('<project-directory>')} [options]`) // 通过这个选项可以修改帮助信息的首行提示，说明用法  create-yum-project <project-directory>(项目名) [options](可选模板等)
    .action(name => {  // 定义命令的回调函数
      projectName = name;
    })
    // .option('--verbose', 'print additional logs')
    .option('--info', '显示环境信息')
    // .option(
    //   '--scripts-version <alternative-package>', 
    //   'use a non-standard version of react-scripts'
    // )
    .option(
      '--template <模板>', // <>定义必需参数，[]定义可选参数
      '选一个具体的模板，后续扩展，默认react typescript' // 选项的描述 在使用-h或者--help时会显示
    )
    .option('--use-pnp')
    .allowUnknownOption()
    .on('--help', () => {
        // 在使用-h或者--help时会显示 细节说明
        //   console.log(
        //     `${chalk.green('')}`
        //   );
    })
    .parse(process.argv); // 用于解析process.argv，设置options以及触发commands

    // cli 所有参数 运行程序一般绝对路径
    // console.log(chalk.green('process.argv info: '));
    // console.log(chalk.green(process.argv));

  // --info 显示环境信息
  if (program.info) {
    console.log(chalk.bold('\nEnvironment Info:'));
    console.log(
      `\n  current version of ${packageJson.name}: ${packageJson.version}`
    );
    console.log(`  running from ${__dirname}`);
    return envinfo
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'npm', 'Yarn'],
          Browsers: [
            'Chrome',
            'Edge',
            'Internet Explorer',
            'Firefox',
            'Safari',
          ],
          npmPackages: ['react', 'react-dom'],
        },
        {
          duplicates: true,
          showNotFound: true,
        }
      )
      .then(console.log);
  }

  // 不在commander范围内 提示
  if (typeof projectName === 'undefined') {
    console.error('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-app')}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
  } else if (projectName) {
    // console.log(process.cwd());
    // console.log(__dirname);
    // console.log(process.execPath);
    // console.log(__filename);

    try{
        execSync(`mkdir ${projectName}`);
        if(process.platform === 'win32') {  // 兼容window
            execSync(`Xcopy ${__dirname}\\react ${projectName} /S /H /E`);  // /H 拷贝隐藏文件      具体看help => xcopy /?
        } else {  //if (process.platform === 'darwin' || process.platform === 'linux') 
            execSync(`cp -r ${__dirname}/react/ ./${projectName}/`);
        }
        console.log(chalk.green(`react项目${projectName}新建成功；`));
        console.log(chalk.green(`目录：${process.cwd()}/${projectName}`));
    } catch(err) {
        console.log(chalk.red('创建项目失败或者目录已存在，有疑问请联系1215904405@qq.com'));
    }
  }
  //   if (latest && semver.lt(packageJson.version, latest)) {
  //      版本检查和推荐 参考 create-react-app源码
  //   } 
  //   const useYarn = isUsingYarn();

  // 依赖安装
  console.info(chalk.cyan('安装依赖包...'));
  try {
    execSync('yarn install', {
        cwd: `./${projectName}/`,
        stdio: 'inherit',
    });
    console.log(chalk.green(`安装完成，本地启动：yarn start`));  
  } catch(err) {
    console.log(chalk.red('依赖安装失败，请手动安装'));
  }
}



module.exports = {
  init,
};
