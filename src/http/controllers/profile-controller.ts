import { Request, Response } from "express";
import {
  validateCPF,
  validateCNPJ,
} from "../../shared/utils/validate-document.utils";
import { ProfileType } from "../../shared/enums/profile-type.enum";
import { CreateProfileUseCase } from "../../aplication/user-case/create-profile.usecase";
import { CreateProfileDto } from "../dto/create-profile.dto";

export class ProfileController {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  async create(req: Request, res: Response) {
    const createProfileDto: CreateProfileDto = req.body;

    if (createProfileDto.type === ProfileType.PF) {
      if (!createProfileDto.cpf || !validateCPF(createProfileDto.cpf)) {
        return res.status(400).json({ error: "Invalid CPF for PF type" });
      }
      createProfileDto.cnpj = undefined;
    } else if (createProfileDto.type === ProfileType.PJ) {
      if (!createProfileDto.cnpj || !validateCNPJ(createProfileDto.cnpj)) {
        return res.status(400).json({ error: "Invalid CNPJ for PJ type" });
      }
    } else {
      return res.status(400).json({ error: "Invalid profile type" });
    }

    const profile = await this.createProfileUseCase.execute(createProfileDto);
    return res.status(201).json(profile);
  }
}
