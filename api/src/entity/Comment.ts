import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Question } from "./Question";
import { User } from "./User";
import { AppDataSource } from "../data-source";

@Entity()
@ObjectType()
export class Comment {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text" })
  text: string;

  @ManyToOne(() => Question, (crq) => crq.comments, { onDelete: "CASCADE" })
  question: Promise<Question>;

  @Field()
  @Column("uuid")
  questionId: string;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "creatorId" })
  creatorConnection: Promise<User>;

  @Field()
  @Column()
  creatorId: number;

  //   @Field()
  //   async creator() {
  //     return await AppDataSource.getRepository(User).findOne({
  //       where: { id: this.creatorId },
  //     });
  //   }

  @Field()
  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;
}
