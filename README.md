# DevTools CLI - SESD Workshop 2 Project

A powerful and feature-rich Command Line Interface (CLI) tool built with Node.js and TypeScript, featuring Object-Oriented Programming principles and multiple API integrations.

## Features

- **11 Custom Commands** with various functionalities
- **5+ API Integrations** (GitHub, Weather, Quotes, Crypto, IP Info, Jokes, Facts, Advice)
- **Object-Oriented Design** with classes and interfaces
- **Colored CLI Output** using Chalk
- **Command Flags/Options** for enhanced functionality
- **Input Validation** and error handling
- **Help Documentation** for all commands

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adarsh-priydarshi-5646/SESD-Workshop-2---CLI-Project.git
cd SESD-Workshop-2---CLI-Project
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link the CLI globally (optional):
```bash
npm link
```

## Available Commands

### 1. Greet Command
Greet a user with a personalized message.

```bash
devtools greet <name>
devtools greet John --formal
devtools greet Sarah --emoji
```

**Options:**
- `-f, --formal` - Use formal greeting
- `-e, --emoji` - Add emoji to greeting

### 2. File Info Command
Get detailed information about a file.

```bash
devtools fileinfo <filename>
devtools fileinfo package.json
devtools fileinfo README.md --size-only
```

**Options:**
- `-s, --size-only` - Show only file size

### 3. GitHub Command (API Integration)
Fetch GitHub user information.

```bash
devtools github <username>
devtools github torvalds
devtools github octocat --repos
```

**Options:**
- `-r, --repos` - Show only repository count

### 4. Weather Command (API Integration)
Get current weather information for any city.

```bash
devtools weather <city>
devtools weather London
devtools weather "New York" --fahrenheit
```

**Options:**
- `-f, --fahrenheit` - Show temperature in Fahrenheit

### 5. Quote Command (API Integration)
Get a random inspirational quote.

```bash
devtools quote
```

### 6. Joke Command (API Integration)
Get a random programming joke.

```bash
devtools joke
```

### 7. Crypto Command (API Integration)
Get cryptocurrency prices.

```bash
devtools crypto
devtools crypto bitcoin
devtools crypto ethereum
```

### 8. IP Info Command (API Integration)
Get information about an IP address.

```bash
devtools ipinfo
devtools ipinfo 8.8.8.8
```

### 9. Fact Command (API Integration)
Get a random interesting fact.

```bash
devtools fact
```

### 10. Advice Command (API Integration)
Get random life advice.

```bash
devtools advice
```

### 11. Math Command
Perform mathematical operations.

```bash
devtools math add 10 5
devtools math subtract 20 8
devtools math multiply 6 7
devtools math divide 100 4
```

## Example Usage

```bash
# Get help
devtools --help
devtools --version

# Greet someone
devtools greet "Adarsh" --emoji

# Check file information
devtools fileinfo package.json

# Get GitHub profile
devtools github adarsh-priydarshi-5646

# Check weather
devtools weather Mumbai

# Get inspiration
devtools quote

# Have a laugh
devtools joke

# Check crypto prices
devtools crypto

# Get your IP info
devtools ipinfo

# Learn something new
devtools fact

# Get life advice
devtools advice

# Do some math
devtools math multiply 15 8
```

## Project Structure

```
.
├── src/
│   ├── commands/          # All command implementations
│   │   ├── GreetCommand.ts
│   │   ├── FileInfoCommand.ts
│   │   ├── GitHubCommand.ts
│   │   ├── WeatherCommand.ts
│   │   ├── QuoteCommand.ts
│   │   ├── JokeCommand.ts
│   │   ├── CryptoCommand.ts
│   │   ├── IPInfoCommand.ts
│   │   ├── FactCommand.ts
│   │   ├── AdviceCommand.ts
│   │   └── MathCommand.ts
│   ├── core/              # Core application logic
│   │   └── CLIApplication.ts
│   ├── services/          # API service layer
│   │   └── APIService.ts
│   ├── utils/             # Utility functions
│   │   └── Logger.ts
│   ├── interfaces/        # TypeScript interfaces
│   │   └── ICommand.ts
│   └── index.ts           # Entry point
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## OOP Concepts Used

- **Classes**: Each command is implemented as a class
- **Interfaces**: `ICommand` interface for consistent command structure
- **Encapsulation**: Private methods and properties
- **Abstraction**: Abstract API service layer
- **Inheritance**: All commands implement the ICommand interface
- **Polymorphism**: Different command implementations with same interface

## API Integrations

1. **GitHub API** - User profile information
2. **Weather API** (wttr.in) - Weather data
3. **Quotable API** - Inspirational quotes
4. **Official Joke API** - Programming jokes
5. **CoinGecko API** - Cryptocurrency prices
6. **IPInfo API** - IP address information
7. **Useless Facts API** - Random facts
8. **Advice Slip API** - Life advice

## Development

Run in development mode:
```bash
npm run dev
```

Build the project:
```bash
npm run build
```

## Author

**Adarsh Priydarshi**

## License

MIT License

## SESD Workshop 2

This project was created as part of the SESD Workshop 2 - CLI Project assignment, demonstrating:
- Object-Oriented Programming in TypeScript
- CLI tool development with Node.js
- API integration and data handling
- Command-line argument parsing
- Error handling and validation
- Code organization and best practices

---

**Submission Date**: 04/03/2026 (Wednesday)
