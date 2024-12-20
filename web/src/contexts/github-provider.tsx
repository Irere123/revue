import React from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { createGithubClient } from "@/lib/github-client";

export const GithubContext =
  React.createContext<ApolloClient<NormalizedCacheObject> | null>(null);

export const GithubContextProvider: React.FC<{
  children: React.ReactNode;
  accessToken: string;
}> = ({ children, accessToken }) => {
  const client = createGithubClient(accessToken);

  return (
    <GithubContext.Provider value={client}>{children}</GithubContext.Provider>
  );
};
