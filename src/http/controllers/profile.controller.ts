import { Request, Response } from "express";
import {
  validateCPF,
  validateCNPJ,
} from "../../shared/utils/validate-document.utils";
import { ProfileType } from "../../shared/enums/profile-type.enum";
import { CreateProfileUseCase } from "../../aplication/user-case/create-profile.usecase";
import { CreateProfileDto } from "../dto/create-profile.dto";
import { validate } from "class-validator";

export class ProfileController {
  constructor(private readonly createProfileUseCase: CreateProfileUseCase) {}

  async create(req: Request, res: Response) {
    const createProfileDto = Object.assign(new CreateProfileDto(), req.body);

    const errors = await validate(createProfileDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    try {
      const profile = await this.createProfileUseCase.execute(createProfileDto);
      return res.status(201).json(profile);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
