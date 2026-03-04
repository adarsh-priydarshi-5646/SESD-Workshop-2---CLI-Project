import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import { APIService } from '../services/APIService';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string;
  company: string;
  blog: string;
  created_at: string;
}

export class GitHubCommand implements ICommand {
  private apiService: APIService;

  constructor() {
    this.apiService = new APIService('https://api.github.com');
  }

  register(program: Command): void {
    program
      .command('github <username>')
      .description('Get GitHub user information')
      .option('-r, --repos', 'Show only repository count')
      .action((username: string, options: any) => {
        this.execute(username, options);
      });
  }

  private async execute(username: string, options: any): Promise<void> {
    try {
      Logger.info('Fetching GitHub user data...');
      const user = await this.apiService.get<GitHubUser>(`/users/${username}`);

      Logger.header(`GitHub Profile: ${user.login}`);
      
      if (options.repos) {
        Logger.data('Public Repositories', user.public_repos.toString());
      } else {
        Logger.data('Name', user.name || 'N/A');
        Logger.data('Bio', user.bio || 'N/A');
        Logger.data('Location', user.location || 'N/A');
        Logger.data('Company', user.company || 'N/A');
        Logger.data('Blog', user.blog || 'N/A');
        Logger.data('Public Repos', user.public_repos.toString());
        Logger.data('Followers', user.followers.toString());
        Logger.data('Following', user.following.toString());
        Logger.data('Joined', new Date(user.created_at).toLocaleDateString());
      }
    } catch (error: any) {
      Logger.error(`Failed to fetch GitHub user: ${error.message}`);
    }
  }
}
