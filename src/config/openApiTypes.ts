interface OpenApiOptions {
  definition: {
    openapi: string;
    info: {
      title: string;
      version: string;
    };
    servers: {
      url: string;
    }[];
    components: {
      responses: {
        NotFoundError: {
          description: string;
          content: {
            'application/json': {
              schema: {
                type: string;
                properties: {
                  error: {
                    type: string;
                    example: string;
                  };
                };
              };
            };
          };
        };
        InternalServerError: {
          description: string;
          content: {
            'application/json': {
              schema: {
                type: string;
                properties: {
                  error: {
                    type: string;
                    example: string;
                  };
                };
              };
            };
          };
        };
      };
    };
  };
  apis: string[];
}

export default OpenApiOptions;
