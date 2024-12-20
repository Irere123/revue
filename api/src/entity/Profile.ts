import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "profiles" })
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  githubContributions: number;

  @Field(() => [String])
  @Column("text", { array: true })
  languages: string[];
}
