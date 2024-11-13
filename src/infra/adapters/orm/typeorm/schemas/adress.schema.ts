import { Column } from "typeorm";

export class Address {
  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  addition?: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  state: string;
}
