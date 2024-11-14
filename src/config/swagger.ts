import swaggerJsDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";
import { ProfileType } from "../shared/enums/profile-type.enum";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Profile API",
      version: "1.0.0",
      description:
        "API para gerenciar perfis de usuários (Indivíduos e Entidades Legais).",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
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
          required: [
            "zipCode",
            "street",
            "number",
            "city",
            "neighborhood",
            "state",
          ],
        },
        CreateProfileDto: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: [ProfileType.PF, ProfileType.PJ],
              example: "PF",
            },
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
        LoginDto: {
          type: "object",
          properties: {
            email: { type: "string", example: "wefit@wefit.com" },
            password: { type: "string", example: "senha_root_123" },
          },
          required: ["email", "password"],
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "jwt.token.aqui" },
          },
        },
      },
    },
    paths: {
      "/login": {
        post: {
          summary: "Login do Usuário",
          description: "Autentica o usuário e retorna um token JWT.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginDto",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Autenticação bem-sucedida",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/AuthResponse",
                  },
                },
              },
            },
            400: {
              description: "Credenciais inválidas",
            },
          },
        },
      },
      "/profile": {
        post: {
          summary: "Cria um novo perfil.",
          description: "Cria um novo perfil com base nos dados fornecidos.",
          security: [{ BearerAuth: [] }],
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
              description: "Perfil criado com sucesso",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/CreateProfileDto",
                  },
                },
              },
            },
            400: {
              description: "Erro de validação",
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
