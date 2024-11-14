import { CreateProfileInterface } from "../contracts/create-profile.interface";
import { ProfileType } from "../../shared/enums/profile-type.enum";

export class Profile implements CreateProfileInterface {
  constructor(
    public type: ProfileType,
    public cnpj: string = "",
    public cpf: string = "",
    public name: string,
    public cell: string,
    public phone: string,
    public email: string,
    public address: {
      zipCode: string;
      street: string;
      number: string;
      addition?: string;
      city: string;
      neighborhood: string;
      state: string;
    }
  ) {}
}
