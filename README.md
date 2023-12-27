# Node.js_Practice

## Example .env file

### MongoDB connection URI

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

### Port on which the server will run

PORT=3000

## Project Documentation

This Node.js project employs Jest for testing, including CRUD operations with a focus on edge cases and error scenarios. MongoDB, hosted on the cloud (using MongoDB Atlas), is used for data storage, and testing is facilitated by the `mongodb-memory-server`.

### Test Files

1. **db.ts**: This file, located in the `src/tests` directory, contains utility functions to connect, clear, and close the test database.

2. **genre.test.ts**: This file, located in the `src/tests` directory, includes tests for CRUD operations related to genres, covering various scenarios such as normal operations, edge cases, and error scenarios.

3. **movie.test.ts**: Also located in the `src/tests` directory, this file focuses on testing CRUD operations for movies, including edge cases and error scenarios.

### Running Tests

To run tests, you can use the following npm scripts:

- `npm run test`: Executes Jest tests.
- `npm run test:coverage`: Executes Jest tests and generates coverage reports.

### Understanding Test Results

The coverage reports can be found in the `coverage` directory after running `npm run test:coverage`. Open the `index.html` file in your browser to explore detailed information about the test coverage.

### Test Coverage

The tests comprehensively cover CRUD operations for genres and movies, ensuring robust functionality under various conditions. Edge cases and error scenarios are included to enhance the reliability and resilience of the application.
