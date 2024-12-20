import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import Select from "react-select";

import { GithubContext } from "@/contexts/github-provider";
import { getViewerRepos } from "@/graphql/query";

interface Props {
  onChange: (data: any) => void;
}

const itemToString = (x: any): string => (x && x.node ? x.node.name : "");

export const RepoAutoComplete: React.FC<Props> = ({ onChange }) => {
  const client = useContext(GithubContext);

  const { data, loading, error } = useQuery(getViewerRepos, {
    client: client as any,
  });

  if (loading) {
    return null;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Select
      placeholder="browse repos"
      onChange={(x) => {
        onChange(x ? (Array.isArray(x) ? x[0] : x).value : null);
      }}
      isSearchable
      options={
        data && data.viewer && data.viewer.repositories.edges
          ? data.viewer.repositories.edges.map((x: any) => ({
              value: x,
              label: itemToString(x),
            }))
          : []
      }
    />
  );
};
