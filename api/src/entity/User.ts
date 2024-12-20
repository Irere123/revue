import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Profile } from "./Profile";
import { Post } from "./Post";
import { Question } from "./Question";
import { Comment } from "./Comment";

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
  githubAccessToken: string;

  @Field(() => Boolean)
  hasUnreadNotification: Promise<boolean>;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email?: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Question, (crq) => crq.creatorConnection)
  Questions: Promise<Question[]>;

  @OneToMany(() => Comment, (qr) => qr.creatorConnection)
  comments: Promise<Comment[]>;

  @OneToMany(() => Post, (crp) => crp.creatorConnection)
  Posts: Promise<Post[]>;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  updatedAt: Date;
}
