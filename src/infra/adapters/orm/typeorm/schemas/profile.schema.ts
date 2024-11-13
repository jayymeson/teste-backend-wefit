import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ProfileType } from "../../../../../shared/enums/profile-type.enum";
import { Address } from "./adress.schema";

@Entity()
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

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  addition: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;

  @Column(() => Address)
  address: Address;
}
