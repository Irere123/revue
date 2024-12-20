import { Field, ID, Int } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { User } from "./User";
import { AppDataSource } from "../data-source";
import { Post } from "./Post";
import { Comment } from "./Comment";

export class Question {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ type: "text", default: "" })
  title: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  lineNum?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  programmingLanguage: string | null;

  @Field()
  @Column({ type: "text" })
  text: string;

  @Field(() => String)
  @Column({ type: "text", nullable: true })
  codeSnippet: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: "text", nullable: true })
  path: string | null;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => Int)
  numComments: number;

  @ManyToOne(() => User, (user) => user.Questions, { onDelete: "CASCADE" })
  creatorConnection: Promise<User>;

  @Field(() => User)
  async creator() {
    return await AppDataSource.getRepository(User).findOne({
      where: { id: this.creatorId },
    });
  }

  @Field(() => Post)
  @ManyToOne(() => Post, (crp) => crp.numQuestions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "postId" })
  post: Promise<User>;

  @Field(() => [Comment])
  @OneToMany(() => Comment, (qr) => qr.question)
  comments: Promise<Comment[]>;

  @Field()
  @Column("uuid")
  postId: string;

  @Field()
  @CreateDateColumn({ type: "time with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "time with time zone" })
  updatedAt: Date;
}
