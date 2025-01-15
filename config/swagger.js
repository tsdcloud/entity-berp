exports.swaggerOptions = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Express API with Swagger",
        version: "1.0.0",
        description: "Documentation for Express API",
      },
    },
    // Paths to files containing OpenAPI definitions
    apis: ["./routes/*.js"],
  };
  