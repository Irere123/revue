import { gql } from "@apollo/client";

import { repoInfoFragment } from "../fragments/RepoInfoFragment.github";

export const getViewerRepos = gql`
  query GetViewerRepos {
    viewer {
      repositories(first: 100) {
        totalCount
        edges {
          node {
            ...RepoInfo
          }
        }
      }
    }
  }

  ${repoInfoFragment}
`;
