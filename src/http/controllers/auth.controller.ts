import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { validate } from "class-validator";
import { AuthenticateUserUseCase } from "@/aplication/user-case/authenticate-user.usecase";

export class AuthController {
  constructor(private readonly authenticateUserUseCase: AuthenticateUserUseCase) {}

  async login(req: Request, res: Response) {
    const loginDto = new LoginDto();
    loginDto.email = req.body.email;
    loginDto.password = req.body.password;

    const errors = await validate(loginDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const result = await this.authenticateUserUseCase.execute(loginDto);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}