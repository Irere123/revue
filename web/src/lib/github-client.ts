import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const githubLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

export const createGithubClient = (accessToken: string) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `bearer ${accessToken}`,
    },
  }));

  return new ApolloClient({
    link: authLink.concat(githubLink),
    cache: new InMemoryCache(),
  });
};
