import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book Management API",
            version: "1.0.0",
            description: "API for managing books",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        tags: [
            {
                name: "Health",
                description: "Health Checks",
            },
            {
                name: "Auth",
                description: "Operations related to users",
            },
            {
                name: "Books",
                description: "Operations related to books",
            },
        ],
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"], // Adjust this to match your API routes
};


const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

