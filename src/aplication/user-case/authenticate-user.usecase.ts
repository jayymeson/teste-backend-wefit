// src/application/use-cases/authenticate-user.usecase.ts

import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { LoginDto } from "../../http/dto/login.dto";

config();

export class AuthenticateUserUseCase {
  private readonly mockUser = {
    email: "wefit@wefit.com",
    password: "senha_root_123", // Mockado para não precisar criar usuário
  };

  async execute(data: LoginDto): Promise<{ token: string }> {
    const { email, password } = data;

    if (email !== this.mockUser.email) {
      throw new Error("Invalid credentials");
    }

    if (password !== this.mockUser.password) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    return { token };
  }
}
