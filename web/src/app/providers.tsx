import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { API_URL } from "@/lib/constants";

const client = new ApolloClient({
  uri: `${API_URL}/graphql`,
  cache: new InMemoryCache(),
  credentials: "include",
});

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloProvider client={client}>
      <TooltipProvider>{children}</TooltipProvider>
    </ApolloProvider>
  );
};
