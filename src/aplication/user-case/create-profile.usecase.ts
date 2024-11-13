import { Profile } from "../../domain/entities/profile";
import { CreateProfileDto } from "../../http/dto/create-profile.dto";
import { ProfileRepository } from "../../infra/repositories/profile.repository";
import { ProfileType } from "../../shared/enums/profile-type.enum";

export class CreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(data: CreateProfileDto) {
    if (!data.cpf || data.cpf.trim() === "") {
      throw new Error("CPF is required and cannot be empty.");
    }

    if (
      data.type === ProfileType.PJ &&
      (!data.cnpj || data.cnpj.trim() === "")
    ) {
      throw new Error("CNPJ is required for PJ type.");
    }

    const profile = new Profile(
      data.type,
      data.cnpj ?? "",
      data.cpf,
      data.name,
      data.cell,
      data.phone,
      data.email,
      data.address
    );

    return await this.profileRepository.create(profile);
  }
}
