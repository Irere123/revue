import { Ctx, Query, Resolver } from "type-graphql";

import { User } from "../../entity/User";
import { GQLContext } from "../../types/context";
import { AppDataSource } from "../../data-source";

@Resolver(User)
export class RecipeResolver {
  @Query(() => [User])
  users() {
    return [];
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
}
