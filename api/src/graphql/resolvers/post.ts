import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { Post } from "../../entity/Post";
import { FindPostResponse, PostResponse } from "../types/responses";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CreatePostInput, FindPostInput } from "../types/inputs";
import { GQLContext } from "../../types/context";
import { AppDataSource } from "../../data-source";
import { Question } from "../../entity/Question";

const POST_LIMIT = 12;

@Resolver(Post)
export class PostResolver {
  @Mutation(() => PostResponse)
  @UseMiddleware(isAuthenticated)
  async findOrCreate(
    @Arg("post") input: CreatePostInput,
    @Ctx() { req }: GQLContext
  ): Promise<PostResponse> {
    let value = await AppDataSource.getRepository(Post).findOne({
      where: {
        repoOwner: input.repoOwner,
        repo: input.repo,
        commitId: input.commitId,
      },
    });

    if (!value) {
      const { raw } = await AppDataSource.manager.insert(Post, {
        ...input,
        creatorId: req.session && req.session.userId,
      });

      value = raw;
    }
    return {
      post: value as Post,
    };
  }

  @Query(() => Post, {
    nullable: true,
  })
  async getPostById(@Arg("id") id: string): Promise<Post | null> {
    return await AppDataSource.getRepository(Post).findOne({ where: { id } });
  }

  @FieldResolver()
  numQuestions(@Root() root: Post): Promise<number> {
    return AppDataSource.getRepository(Question).count({
      where: { postId: root.id },
    });
  }

  @Query(() => FindPostResponse)
  async findPost(
    @Arg("input") { topics, cursor }: FindPostInput
  ): Promise<FindPostResponse> {
    const qb = AppDataSource.createQueryBuilder()
      .orderBy('"createdAt"', "DESC")
      .take(POST_LIMIT + 1);

    if (topics.length) {
      qb.where("topics @> :topics", { topics });
    }

    if (cursor) {
      qb.where('"createdAt" < :cursor', { cursor });
    }

    const posts = await qb.getMany();

    return {
      hasMore: false,
      posts: posts.slice(0, POST_LIMIT),
    };
  }
}
