# Playwright MCP Template

A template project for Playwright end-to-end testing with a structured architecture using Page Object Model, custom fixtures, and scenario-based testing.

## Project Structure

```
Playwright-MCP-template/
├── pages/           # Page Object Model classes
├── fixtures/        # Custom Playwright fixtures
├── scenarios/       # Test scenarios and data
├── tests/           # Test files
├── prompts/         # AI prompts for test generation
└── .cursor/         # Cursor IDE rules
    └── rules/       # Project-specific coding rules
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

### Configuration

Update `playwright.config.ts` with your project's base URL and test configuration.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Generate code
npm run test:codegen

# View test report
npm run report
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

## Architecture

### Page Object Model (POM)

Create page objects in the `pages/` folder. Each page object should encapsulate the interactions with a specific page or component.

### Custom Fixtures

Define custom fixtures in the `fixtures/` folder to provide reusable test setup, dependencies, and utilities.

### Scenarios

Define test scenarios and test data in the `scenarios/` folder to organize test cases by business scenarios.

## License

ISC
