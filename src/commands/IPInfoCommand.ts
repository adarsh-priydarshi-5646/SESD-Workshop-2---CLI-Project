import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';

interface IPInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  timezone: string;
}

export class IPInfoCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('ipinfo [ip]')
      .description('Get information about an IP address (or your own)')
      .action((ip?: string) => {
        this.execute(ip);
      });
  }

  private async execute(ip?: string): Promise<void> {
    try {
      Logger.info('Fetching IP information...');
      const endpoint = ip ? `https://ipinfo.io/${ip}/json` : 'https://ipinfo.io/json';
      const data = await this.apiService.get<IPInfo>(endpoint);

      Logger.header('IP Information');
      Logger.data('IP Address', data.ip);
      Logger.data('City', data.city || 'N/A');
      Logger.data('Region', data.region || 'N/A');
      Logger.data('Country', data.country || 'N/A');
      Logger.data('Location', data.loc || 'N/A');
      Logger.data('Organization', data.org || 'N/A');
      Logger.data('Timezone', data.timezone || 'N/A');
    } catch (error: any) {
      Logger.error(`Failed to fetch IP info: ${error.message}`);
    }
  }
}
