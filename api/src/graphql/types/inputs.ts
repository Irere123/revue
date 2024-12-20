import { Field, InputType } from "type-graphql";

@InputType()
export class FindPostInput {
  @Field(() => [String], { nullable: true })
  topics: string[];

  @Field(() => String, { nullable: true })
  cursor?: string;
}

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  repo: string;

  @Field(() => [String])
  topics: string[];

  @Field()
  description: string;

  @Field()
  commitId: string;

  @Field()
  repoOwner: string;
}
