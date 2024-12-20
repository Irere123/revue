import React from "react";
import { useNavigate } from "react-router";

import { useQuery, gql } from "@apollo/client";
// import { graphql } from "@/graphql";

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      bio
      displayName
      email
      username
      updatedAt
      createdAt
    }
  }
`;

interface Options {
  LoadingComponent?: () => React.ReactNode;
  redirectUrl?: string;
  shouldReredictIfAuth?: boolean;
  requireAuth?: boolean;
}

const withAuth = (WrappedComponent: React.FC, options: Options = {}) => {
  const {
    LoadingComponent = () => <div>loading...</div>,
    redirectUrl = "/",
    requireAuth = true,
    shouldReredictIfAuth = false,
  } = options;

  const WithAuthComponent = (props: any) => {
    const { data, loading, error } = useQuery(ME_QUERY, {
      fetchPolicy: "cache-and-network",
    });
    const navigate = useNavigate();

    // Show loading state
    if (loading) {
      return <LoadingComponent />;
    }

    // Handle authentication error or no user data
    if (error || !data?.me) {
      if (requireAuth && typeof window !== "undefined") {
        // Redirect to login page if authentication is required
        return navigate(redirectUrl);
      }
    }

    if (shouldReredictIfAuth && data?.me) {
      return navigate("/dash");
    }

    return (
      <WrappedComponent
        {...props}
        user={data?.me}
        isAuthenticated={!!data?.me}
      />
    );
  };

  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

function getDisplayName(WrappedComponent: React.FC) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
