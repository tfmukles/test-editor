import "@mdxeditor/editor/style.css";
import { Octokit } from "octokit";
import { cache } from "react";
import Editor from "./editor";

const githubToken =
  "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";

const getData = cache(async () => {
  const octokit = new Octokit({
    auth: githubToken,
  });
  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: "tfmukles",
      repo: "nextplate",
      path: "src/content/english/pages/elements.md",
    }
  )) as any;
  return Buffer.from(data.content, "base64").toString("utf-8");
});

export default async function App() {
  const markdown = await getData();

  return (
    <div className="container">
      <Editor markdown={markdown} />
    </div>
  );
}
