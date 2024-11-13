import swaggerJsDoc from "swagger-jsdoc";
import { ProfileType } from "../shared/enums/profile-type.enum";
import { SwaggerOptions } from "swagger-ui-express";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Profile API",
      version: "1.0.0",
      description: "API for managing user profiles (Individuals and Legal Entities).",
    },
    components: {
      schemas: {
        Address: {
          type: "object",
          properties: {
            zipCode: { type: "string", example: "12345-678" },
            street: { type: "string", example: "Av. Principal" },
            number: { type: "string", example: "123" },
            addition: { type: "string", example: "Apt. 101" },
            city: { type: "string", example: "São Paulo" },
            neighborhood: { type: "string", example: "Centro" },
            state: { type: "string", example: "SP" },
          },
          required: ["zipCode", "street", "number", "city", "neighborhood", "state"],
        },
        CreateProfileDto: {
          type: "object",
          properties: {
            type: { type: "string", enum: [ProfileType.PF, ProfileType.PJ], example: "PF" },
            cnpj: { type: "string", example: "12345678000199" },
            cpf: { type: "string", example: "12345678909" },
            name: { type: "string", example: "João da Silva" },
            cell: { type: "string", example: "+5511987654321" },
            phone: { type: "string", example: "+551134567890" },
            email: { type: "string", example: "joao.silva@example.com" },
            address: { $ref: "#/components/schemas/Address" },
          },
          required: ["type", "cpf", "name", "cell", "email", "address"],
        },
      },
    },
    paths: {
      "/profile": {
        post: {
          summary: "Creates a new profile.",
          description: "Creates a new profile based on the data provided.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/CreateProfileDto",
                },
              },
            },
          },
          responses: {
            201: {
              description: "Profile created successfully",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateProfileDto",
                  },
                },
              },
            },
            400: {
              description: "Validation error",
            },
          },
        },
      },
    },
  },
  apis: ["./src/http/routes/*.ts"],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;