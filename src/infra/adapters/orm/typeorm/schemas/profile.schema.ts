import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";
import { ProfileType } from "../../../../../shared/enums/profile-type.enum";
import { Address } from "./adress.schema";

@Entity()
@Index(["cpf", "type"], { unique: true, where: "type = 'PF'" })
@Index(["cpf", "cnpj"], { unique: true, where: "type = 'PJ'" })
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ProfileType,
  })
  type: ProfileType;

  @Column({ nullable: true })
  cnpj: string;

  @Column({ nullable: false })
  cpf: string;

  @Column()
  name: string;

  @Column()
  cell: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column(() => Address)
  address: Address;

  @Column({ default: false })
  termsAccepted: boolean;
}
