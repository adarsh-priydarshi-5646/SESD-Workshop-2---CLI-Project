import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';
import chalk from 'chalk';

interface Joke {
  setup: string;
  punchline: string;
  type?: string;
  joke?: string;
}

export class JokeCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('joke')
      .description('Get a random programming joke')
      .action(() => {
        this.execute();
      });
  }

  private async execute(): Promise<void> {
    try {
      Logger.info('Fetching joke...');
      const joke = await this.apiService.get<Joke>(
        'https://official-joke-api.appspot.com/random_joke'
      );

      Logger.header('Programming Joke 😄');
      console.log(chalk.yellow(joke.setup));
      console.log(chalk.green(`\n${joke.punchline}\n`));
    } catch (error: any) {
      Logger.error(`Failed to fetch joke: ${error.message}`);
    }
  }
}
