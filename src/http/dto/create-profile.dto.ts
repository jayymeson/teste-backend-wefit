import { ProfileType } from "../../shared/enums/profile-type.enum";

export class CreateProfileDto {
  type: ProfileType;
  cnpj?: string;
  cpf?: string;
  name: string;
  cell: string;
  phone: string;
  email: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    addition?: string;
    city: string;
    neighborhood: string;
    state: string;
  };
}
