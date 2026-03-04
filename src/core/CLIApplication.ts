import { Command } from 'commander';
import { GreetCommand } from '../commands/GreetCommand';
import { FileInfoCommand } from '../commands/FileInfoCommand';
import { GitHubCommand } from '../commands/GitHubCommand';
import { WeatherCommand } from '../commands/WeatherCommand';
import { QuoteCommand } from '../commands/QuoteCommand';
import { JokeCommand } from '../commands/JokeCommand';
import { CryptoCommand } from '../commands/CryptoCommand';
import { IPInfoCommand } from '../commands/IPInfoCommand';
import { FactCommand } from '../commands/FactCommand';
import { AdviceCommand } from '../commands/AdviceCommand';
import { MathCommand } from '../commands/MathCommand';

export class CLIApplication {
  private program: Command;
  private commands: any[];

  constructor(program: Command) {
    this.program = program;
    this.commands = [
      new GreetCommand(),
      new FileInfoCommand(),
      new GitHubCommand(),
      new WeatherCommand(),
      new QuoteCommand(),
      new JokeCommand(),
      new CryptoCommand(),
      new IPInfoCommand(),
      new FactCommand(),
      new AdviceCommand(),
      new MathCommand()
    ];
  }

  initialize(): void {
    this.program
      .name('devtools')
      .description('A powerful CLI tool for developers')
      .version('1.0.0');

    this.commands.forEach(command => {
      command.register(this.program);
    });
  }

  run(): void {
    this.program.parse(process.argv);
  }
}
