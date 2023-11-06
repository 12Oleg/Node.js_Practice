import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Node.js Express API with Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        Genre: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the genre.',
            },
            name: {
              type: 'string',
              description: 'Name of the genre.',
            },
          },
        },
        Movie: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'The unique identifier for a movie.',
            },
            title: {
              type: 'string',
              description: 'The title of the movie.',
            },
            description: {
              type: 'string',
              description: 'Description of the movie.',
            },
            releaseDate: {
              type: 'string',
              format: 'date',
              description: 'Release date of the movie.',
            },
            genre: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of genres associated with the movie.',
            },
          },
        },
        CustomError: {
          type: 'object',
          title: 'CustomError',
          properties: {
            error: {
              type: 'string',
            },
          },
        },
        ValidationError: {
          type: 'object',
          title: 'ValidationError',
          properties: {
            description: {
              type: 'string',
            },
            error: {
              type: 'string',
            },
          },
        },
      },
      responses: {
        NotFoundError: {
          description: 'The requested resource was not found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
        InternalServerError: {
          description: 'An internal server error occurred.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Internal Server Error',
                  },
                },
              },
            },
          },
        },
        GenreNotFound: {
          description: 'Genre not found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                  },
                },
              },
              example: {
                error: 'Genre not found.',
              },
            },
          },
        },
        MovieNotFound: {
          description: 'Movie not found.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                  },
                },
              },
              example: {
                error: 'Movie not found.',
              },
            },
          },
        },
        ValidationError: {
          description: 'Bad request. Validation error occurred.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError',
              },
              example: {
                description:
                  'Validation error occurred. Please check your input data and try again.',
                error: 'Error message from the validation process.',
              },
            },
          },
        },
        CustomOrValidationError: {
          description: 'Bad request. Either a Custom error or a Validation error occurred.',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    $ref: '#/components/schemas/CustomError',
                  },
                  {
                    $ref: '#/components/schemas/ValidationError',
                  },
                ],
              },
              examples: {
                CustomError: {
                  value: {
                    error: 'Missing required field(s). Please provide all necessary information.',
                  },
                },
                ValidationError: {
                  value: {
                    description:
                      'Validation error occurred. Please check your input data and try again.',
                    error: 'Error message from the validation process.',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export default options;
