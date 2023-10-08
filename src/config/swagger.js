const options = {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Node.js Express API with Swagger',
        version: '1.0.0',
      },
      servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
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
                    example: 'Not Found'
                  }
                }
              }
            }
          }
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
                    example: 'Internal Server Error'
                  }
                }
              }
            }
          }
        },
      },
    },
  },
    apis: ['./src/routes/*.js'],
  };
  
  module.exports = options;
  