"use client";

import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  GenericJsxEditor,
  InsertImage,
  InsertTable,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  diffSourcePlugin,
  headingsPlugin,
  jsxPlugin,
  linkDialogPlugin,
  linkPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { startTransition, useState } from "react";

export default function Editor({ markdown }: { markdown: string }) {
  const [state, setState] = useState<string>(markdown);

  return (
    <div className="container mx-auto flex flex-col justify-center items-center ">
      <MDXEditor
        onChange={(value) => {
          startTransition(() => {
            setState(value);
          });
        }}
        className="prose lg:prose-xl border rounded my-10"
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          quotePlugin(),
          codeBlockPlugin(),
          tablePlugin(),
          markdownShortcutPlugin(),
          jsxPlugin({
            jsxComponentDescriptors: [
              {
                name: "MyLeaf",
                kind: "text",
                source: "./external",
                props: [
                  { name: "foo", type: "string" },
                  { name: "bar", type: "string" },
                  { name: "onClick", type: "expression" },
                ],
                hasChildren: true,
                Editor: GenericJsxEditor,
              },
            ],
          }),
          diffSourcePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <Separator />
                <ListsToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <CreateLink />
                <InsertImage />
                <Separator />
                <InsertTable />
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                </DiffSourceToggleWrapper>
              </>
            ),
          }),
        ]}
      />
    </div>
  );
}
