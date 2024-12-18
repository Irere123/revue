import { Query, Resolver } from "type-graphql";

import { User } from "../../entity/User";

@Resolver(User)
export class RecipeResolver {
  @Query(() => [User])
  users() {
    return [];
  }
}
