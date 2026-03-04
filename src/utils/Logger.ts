import chalk from 'chalk';

export class Logger {
  static success(message: string): void {
    console.log(chalk.green('✓ ' + message));
  }

  static error(message: string): void {
    console.log(chalk.red('✗ ' + message));
  }

  static info(message: string): void {
    console.log(chalk.blue('ℹ ' + message));
  }

  static warning(message: string): void {
    console.log(chalk.yellow('⚠ ' + message));
  }

  static header(message: string): void {
    console.log(chalk.bold.cyan('\n' + message + '\n'));
  }

  static data(label: string, value: string): void {
    console.log(chalk.gray(label + ': ') + chalk.white(value));
  }
}
