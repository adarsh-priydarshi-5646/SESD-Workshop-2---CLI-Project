import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import * as fs from 'fs';
import * as path from 'path';

export class FileInfoCommand implements ICommand {
  register(program: Command): void {
    program
      .command('fileinfo <filename>')
      .description('Get detailed information about a file')
      .option('-s, --size-only', 'Show only file size')
      .action((filename: string, options: any) => {
        this.execute(filename, options);
      });
  }

  private execute(filename: string, options: any): void {
    try {
      if (!fs.existsSync(filename)) {
        Logger.error(`File not found: ${filename}`);
        return;
      }

      const stats = fs.statSync(filename);
      const ext = path.extname(filename);
      const basename = path.basename(filename);

      Logger.header('File Information');
      
      if (options.sizeOnly) {
        Logger.data('Size', this.formatBytes(stats.size));
      } else {
        Logger.data('Name', basename);
        Logger.data('Path', path.resolve(filename));
        Logger.data('Size', this.formatBytes(stats.size));
        Logger.data('Extension', ext || 'None');
        Logger.data('Created', stats.birthtime.toLocaleString());
        Logger.data('Modified', stats.mtime.toLocaleString());
        Logger.data('Is Directory', stats.isDirectory() ? 'Yes' : 'No');
      }
    } catch (error: any) {
      Logger.error(`Error reading file: ${error.message}`);
    }
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}
