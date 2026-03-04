#!/usr/bin/env node

import { Command } from 'commander';
import { CLIApplication } from './core/CLIApplication';

const program = new Command();
const app = new CLIApplication(program);

app.initialize();
app.run();
