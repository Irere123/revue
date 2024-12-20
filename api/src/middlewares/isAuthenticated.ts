import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import { GQLContext } from "../types/context";

export const isAuthenticated: MiddlewareFn<GQLContext> = (
  { context },
  next
): Promise<any> => {
  if (!context.req.session || !context.req.session.userId) {
    throw new GraphQLError("Not authenticated");
  }

  return next();
};
