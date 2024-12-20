import { Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "profiles" })
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;
}
