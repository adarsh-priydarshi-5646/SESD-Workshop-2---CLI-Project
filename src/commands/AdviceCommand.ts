import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';
import chalk from 'chalk';

interface Advice {
  slip: {
    advice: string;
  };
}

export class AdviceCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('advice')
      .description('Get random life advice')
      .action(() => {
        this.execute();
      });
  }

  private async execute(): Promise<void> {
    try {
      Logger.info('Fetching advice...');
      const data = await this.apiService.get<Advice>('https://api.adviceslip.com/advice');

      Logger.header('Life Advice 💡');
      console.log(chalk.yellow(data.slip.advice));
      console.log();
    } catch (error: any) {
      Logger.error(`Failed to fetch advice: ${error.message}`);
    }
  }
}
