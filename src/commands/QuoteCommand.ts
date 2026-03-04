import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';
import chalk from 'chalk';

interface Quote {
  content: string;
  author: string;
}

export class QuoteCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('quote')
      .description('Get a random inspirational quote')
      .option('-c, --category <type>', 'Quote category (motivational, success, life)')
      .action((options: any) => {
        this.execute(options);
      });
  }

  private async execute(options: any): Promise<void> {
    try {
      Logger.info('Fetching quote...');
      const quote = await this.apiService.get<Quote>('https://api.quotable.io/random');

      Logger.header('Quote of the Moment');
      console.log(chalk.italic.white(`"${quote.content}"`));
      console.log(chalk.gray(`\n— ${quote.author}\n`));
    } catch (error: any) {
      Logger.error(`Failed to fetch quote: ${error.message}`);
    }
  }
}
