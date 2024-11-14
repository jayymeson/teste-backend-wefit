import { Repository } from "typeorm";
import { Profile } from "../adapters/orm/typeorm/schemas/profile.schema";
import { AppDataSource } from "../adapters/orm/typeorm/config";
import { CreateProfileDto } from "../../http/dto/create-profile.dto";
import { ProfileType } from "@/shared/enums/profile-type.enum";

export class ProfileRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = AppDataSource.getRepository(Profile);
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    const profile = this.repository.create(data);
    return await this.repository.save(profile);
  }

  async findByCpfAndType(
    cpf: string,
    type: ProfileType
  ): Promise<Profile | null> {
    return await this.repository.findOne({ where: { cpf, type } });
  }

  async findByCpfAndCnpj(cpf: string, cnpj: string): Promise<Profile | null> {
    return await this.repository.findOne({ where: { cpf, cnpj } });
  }
}
