/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetUserByUsername($username: String!) {\n    getUserByUsername(username: $username) {\n      id\n      displayName\n      username\n      email\n      avatarUrl\n      bio\n    }\n  }\n": types.GetUserByUsernameDocument,
    "\n  mutation LogoutQuery {\n    logout\n  }\n": types.LogoutQueryDocument,
    "\n  query Me {\n    me {\n      id\n      bio\n      displayName\n      githubAccessToken\n      email\n      username\n      updatedAt\n      createdAt\n    }\n  }\n": types.MeDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByUsername($username: String!) {\n    getUserByUsername(username: $username) {\n      id\n      displayName\n      username\n      email\n      avatarUrl\n      bio\n    }\n  }\n"): (typeof documents)["\n  query GetUserByUsername($username: String!) {\n    getUserByUsername(username: $username) {\n      id\n      displayName\n      username\n      email\n      avatarUrl\n      bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LogoutQuery {\n    logout\n  }\n"): (typeof documents)["\n  mutation LogoutQuery {\n    logout\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      bio\n      displayName\n      githubAccessToken\n      email\n      username\n      updatedAt\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      bio\n      displayName\n      githubAccessToken\n      email\n      username\n      updatedAt\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;