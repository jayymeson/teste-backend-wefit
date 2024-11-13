import { Repository } from "typeorm";
import { Profile } from "../adapters/orm/typeorm/schemas/profile.schema";
import { AppDataSource } from "../adapters/orm/typeorm/config";
import { CreateProfileDto } from "../../http/dto/create-profile.dto";

export class ProfileRepository {
  private repository: Repository<Profile>;

  constructor() {
    this.repository = AppDataSource.getRepository(Profile);
  }

  async create(data: CreateProfileDto): Promise<Profile> {
    const profile = this.repository.create(data);
    return await this.repository.save(profile);
  }
}