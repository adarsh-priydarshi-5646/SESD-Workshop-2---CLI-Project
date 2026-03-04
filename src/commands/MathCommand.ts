import { Command } from 'commander';
import { ICommand } from '../interfaces/ICommand';
import { Logger } from '../utils/Logger';
import chalk from 'chalk';

export class MathCommand implements ICommand {
  register(program: Command): void {
    program
      .command('math <operation> <num1> <num2>')
      .description('Perform mathematical operations (add, subtract, multiply, divide)')
      .action((operation: string, num1: string, num2: string) => {
        this.execute(operation, num1, num2);
      });
  }

  private execute(operation: string, num1: string, num2: string): void {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      Logger.error('Invalid numbers provided');
      return;
    }

    let result: number;
    let symbol: string;

    switch (operation.toLowerCase()) {
      case 'add':
        result = n1 + n2;
        symbol = '+';
        break;
      case 'subtract':
        result = n1 - n2;
        symbol = '-';
        break;
      case 'multiply':
        result = n1 * n2;
        symbol = '×';
        break;
      case 'divide':
        if (n2 === 0) {
          Logger.error('Cannot divide by zero');
          return;
        }
        result = n1 / n2;
        symbol = '÷';
        break;
      default:
        Logger.error('Invalid operation. Use: add, subtract, multiply, or divide');
        return;
    }

    Logger.header('Math Result');
    console.log(chalk.white(`${n1} ${symbol} ${n2} = `) + chalk.green.bold(result));
    console.log();
  }
}
