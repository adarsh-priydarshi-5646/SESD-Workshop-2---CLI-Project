import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import chalk from 'chalk';

export class GreetCommand implements ICommand {
  register(program: Command): void {
    program
      .command('greet <name>')
      .description('Greet a user with a personalized message')
      .option('-f, --formal', 'Use formal greeting')
      .option('-e, --emoji', 'Add emoji to greeting')
      .action((name: string, options: any) => {
        this.execute(name, options);
      });
  }

  private execute(name: string, options: any): void {
    let greeting = options.formal ? `Good day, ${name}!` : `Hey ${name}! 👋`;
    
    if (options.emoji && !options.formal) {
      greeting += ' 🎉';
    }

    Logger.header('Greeting');
    console.log(chalk.magenta(greeting));
  }
}
