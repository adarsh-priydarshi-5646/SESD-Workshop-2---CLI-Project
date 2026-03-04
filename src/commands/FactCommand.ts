import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';
import chalk from 'chalk';

interface Fact {
  text: string;
}

export class FactCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('fact')
      .description('Get a random interesting fact')
      .action(() => {
        this.execute();
      });
  }

  private async execute(): Promise<void> {
    try {
      Logger.info('Fetching random fact...');
      const data = await this.apiService.get<Fact>('https://uselessfacts.jsph.pl/random.json?language=en');

      Logger.header('Random Fact 🧠');
      console.log(chalk.cyan(data.text));
      console.log();
    } catch (error: any) {
      Logger.error(`Failed to fetch fact: ${error.message}`);
    }
  }
}
