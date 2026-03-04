import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';

interface CryptoData {
  bitcoin: {
    usd: number;
    usd_24h_change: number;
  };
  ethereum: {
    usd: number;
    usd_24h_change: number;
  };
}

export class CryptoCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('crypto [coin]')
      .description('Get cryptocurrency prices (bitcoin, ethereum)')
      .action((coin?: string) => {
        this.execute(coin);
      });
  }

  private async execute(coin?: string): Promise<void> {
    try {
      Logger.info('Fetching crypto prices...');
      
      const coins = coin ? coin.toLowerCase() : 'bitcoin,ethereum';
      const data = await this.apiService.get<any>(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd&include_24hr_change=true`
      );

      Logger.header('Cryptocurrency Prices');

      Object.keys(data).forEach(coinName => {
        const price = data[coinName].usd;
        const change = data[coinName].usd_24h_change;
        const changeSymbol = change >= 0 ? '📈' : '📉';
        
        Logger.data(
          coinName.charAt(0).toUpperCase() + coinName.slice(1),
          `$${price.toLocaleString()} ${changeSymbol} ${change.toFixed(2)}%`
        );
      });
    } catch (error: any) {
      Logger.error(`Failed to fetch crypto data: ${error.message}`);
    }
  }
}
