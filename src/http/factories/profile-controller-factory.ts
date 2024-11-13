import { CreateProfileUseCase } from "../../aplication/user-case/create-profile.usecase";
import { ProfileRepository } from "../../infra/repositories/profile.repository";
import { ProfileController } from "../controllers/profile-controller";

export const makeProfileController = (): ProfileController => {
  const repository = new ProfileRepository();
  const useCase = new CreateProfileUseCase(repository);
  return new ProfileController(useCase);
};
