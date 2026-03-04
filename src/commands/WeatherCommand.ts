import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';

interface WeatherData {
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
  };
  location: {
    name: string;
    country: string;
    localtime: string;
  };
}

export class WeatherCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService();
  }

  register(program: Command): void {
    program
      .command('weather <city>')
      .description('Get current weather information for a city')
      .option('-f, --fahrenheit', 'Show temperature in Fahrenheit')
      .action((city: string, options: any) => {
        this.execute(city, options);
      });
  }

  private async execute(city: string, options: any): Promise<void> {
    try {
      Logger.info('Fetching weather data...');
      const data = await this.apiService.get<WeatherData>(
        `https://wttr.in/${encodeURIComponent(city)}?format=j1`
      );

      const current = data.current_condition?.[0] || data.current;
      const location = data.nearest_area?.[0] || data.location;

      Logger.header(`Weather in ${city}`);
      
      const temp = options.fahrenheit 
        ? `${current.temp_F || current.temp_f}°F`
        : `${current.temp_C || current.temp_c}°C`;
      
      Logger.data('Temperature', temp);
      Logger.data('Condition', current.weatherDesc?.[0]?.value || current.condition?.text || 'N/A');
      Logger.data('Humidity', `${current.humidity}%`);
      Logger.data('Wind Speed', `${current.windspeedKmph || current.wind_kph} km/h`);
    } catch (error: any) {
      Logger.error(`Failed to fetch weather data: ${error.message}`);
      Logger.warning('Try using a different city name or check your internet connection');
    }
  }
}
