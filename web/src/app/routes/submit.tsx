import { Field, Formik } from "formik";
import { get } from "lodash";
import { useContext, useState } from "react";
import * as yup from "yup";

import { InputField } from "@/components/input-field";
import { RepoAutoComplete } from "@/components/repo-autocomplete";
import { Button } from "@/components/ui/button";
import { GithubContext } from "@/contexts/github-provider";
import { getRepoQuery } from "@/graphql/query";

const githubUrlRegex =
  /(?:https:\/\/)?(?:www\.)?github\.com\/([A-Za-z\d-]+)\/([A-Za-z\d-]+)/;

const validationSchema = yup.object().shape({
  githubUrl: yup
    .string()
    .matches(githubUrlRegex, "enter a valid repo")
    .required("required"),
  title: yup.string().required("required"),
});

const makeGitHubUrl = (node: any): string =>
  `https://github.com/${node.owner.login}/${node.name}`;

export default function SubmitPage() {
  const [lastRepoSelected, setLastRepoSelected] = useState<any>(null);

  const githubClient = useContext(GithubContext);

  return (
    <div>
      <Formik
        initialValues={{ githubUrl: "", title: "" }}
        onSubmit={async ({ githubUrl }, { setErrors }) => {
          let item: any;
          if (
            lastRepoSelected &&
            makeGitHubUrl(lastRepoSelected) === githubUrl
          ) {
            item = lastRepoSelected;
          } else {
            if (!githubClient) {
              return setErrors({ githubUrl: "unable to find repo" });
            }
            const [, owner = "", name = ""] =
              githubUrl.match(githubUrlRegex) || [];
            try {
              const response = await githubClient.query({
                query: getRepoQuery,
                variables: { name, owner },
              });

              if (!response.data.repository) {
                return setErrors({ githubUrl: "unable to find repo" });
              }
              item = response.data.repository;
            } catch {
              return setErrors({ githubUrl: "unable to find repo" });
            }
          }

          const programmingLanguages = get(item, "languages.edges", []).map(
            (x: any) => x.node.name
          );
          const topics = get(item, "repositoryTopics.edges", []).map(
            (x: any) => x.node && x.node.topic.name
          );

          console.log(programmingLanguages);
          console.log(topics);
        }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, setFieldValue }) => (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <h1 style={{ marginBottom: "1rem" }}>GitHub repo url</h1>
              <div>
                <div className="flex gap-4">
                  <div style={{ width: 225 }}>
                    <RepoAutoComplete
                      onChange={(x) => {
                        if (x && x.node) {
                          setFieldValue("githubUrl", makeGitHubUrl(x.node));
                          setLastRepoSelected(x.node);
                        }
                      }}
                    />
                  </div>
                  <Field
                    style={{ flex: 1 }}
                    big
                    name="githubUrl"
                    component={InputField}
                  />
                </div>
                <h1 style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                  Title
                </h1>
                <Field big name="title" component={InputField} />
              </div>
              <Button type="submit">Create a request</Button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
}
