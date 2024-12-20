import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@apollo/client";

import { gql } from "@/__generated__/gql";

const ME_QUERY = gql(`
  query Me {
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
`);

interface Options {
  LoadingComponent?: () => React.ReactNode;
  redirectUrl?: string;
  shouldReredictIfAuth?: boolean;
  requireAuth?: boolean;
}

const withAuth = (WrappedComponent: React.FC<any>, options: Options = {}) => {
  const {
    LoadingComponent = () => <div>loading...</div>,
    redirectUrl = "/",
    requireAuth = true,
    shouldReredictIfAuth = false,
  } = options;

  const WithAuthComponent: React.FC<any> = (props) => {
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
        navigate(redirectUrl);
        return null;
      }
    }

    if (shouldReredictIfAuth && data?.me) {
      navigate("/dash");
      return null;
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
