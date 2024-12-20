import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { User } from "../../entity/User";
import { GQLContext } from "../../types/context";
import { AppDataSource } from "../../data-source";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { COOKIE_NAME } from "../../lib/constants";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  users() {
    return AppDataSource.getRepository(User).find();
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuthenticated)
  async logout(@Ctx() ctx: GQLContext) {
    return new Promise((res, rej) => {
      ctx.req.session?.destroy((err) => {
        if (err) {
          console.error(err);
          return rej(false);
        }

        ctx.res.clearCookie(COOKIE_NAME);
        return res(true);
      });
    });
  }

  @FieldResolver()
  githubAccessToken(@Ctx() { req }: GQLContext) {
    return req.session && req.session.accessToken
      ? req.session.accessToken
      : "";
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: GQLContext) {
    const { userId = "" } = req.session || {};

    if (!userId) {
      return null;
    }

    return await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
  }

  @Query(() => User, { nullable: true })
  async getUserByUsername(
    @Arg("username", { nullable: false }) username: string
  ) {
    return await AppDataSource.getRepository(User).findOne({
      where: { username },
    });
  }
}
