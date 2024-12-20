import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { AppDataSource } from "../data-source";
import { Question } from "./Question";

@ObjectType()
@Entity()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => [String])
  topics: string;

  @Field()
  @Column({ type: "text" })
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "text" })
  repo: string;

  @Field()
  @Column({ type: "text" })
  repoOwner: string;

  @Field()
  @Column()
  creatorId: number;

  //   @Field(() => User)
  //   async creator() {
  //     return await AppDataSource.getRepository(User).findOne({
  //       where: { id: this.creatorId },
  //     });
  //   }

  @OneToMany(() => Question, (crq) => crq.post)
  questions: Promise<Question[]>;

  @ManyToOne(() => User, (user) => user.Posts, { onDelete: "CASCADE" })
  creatorConnection: Promise<User>;

  @Field()
  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;

  @Field(() => Int)
  numQuestions: number;
}
