import { AuthenticateUserUseCase } from "@/aplication/user-case/authenticate-user.usecase";
import { AuthController } from "../controllers/auth.controller";

export const makeAuthController = (): AuthController => {
  const useCase = new AuthenticateUserUseCase();
  return new AuthController(useCase);
};
