import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Profile } from "./Profile";

@ObjectType()
@Entity({ name: "users" })
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  displayName: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  bio: string | null;

  @Field(() => String)
  @Column({ type: "text" })
  avatarUrl: string;

  @Column({ type: "text", unique: true })
  githubId: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  githubProfileUrl: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "text" })
  githubAccessToken: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email?: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
}
