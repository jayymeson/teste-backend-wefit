import { Profile } from "../../domain/entities/profile";
import { CreateProfileDto } from "../../http/dto/create-profile.dto";
import { ProfileRepository } from "../../infra/repositories/profile.repository";
import { ProfileType } from "../../shared/enums/profile-type.enum";

export class CreateProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async execute(data: CreateProfileDto): Promise<Profile> {
    if (!data.termsAccepted) {
      throw new Error("Você deve aceitar os termos para continuar.");
    }

    if (data.type === ProfileType.PF) {
      const existingProfile = await this.profileRepository.findByCpfAndType(
        data.cpf,
        ProfileType.PF
      );
      if (existingProfile) {
        throw new Error("Já existe um perfil PF com este CPF.");
      }
    } else if (data.type === ProfileType.PJ) {
      if (!data.cnpj || data.cnpj.trim() === "") {
        throw new Error("CNPJ é obrigatório para perfis PJ.");
      }
      const existingProfile = await this.profileRepository.findByCpfAndCnpj(
        data.cpf,
        data.cnpj
      );
      if (existingProfile) {
        throw new Error("Já existe um perfil PJ com este CPF e CNPJ.");
      }
    } else {
      throw new Error("Tipo de perfil inválido.");
    }

    const profile = await this.profileRepository.create(data);
    return profile;
  }
}
