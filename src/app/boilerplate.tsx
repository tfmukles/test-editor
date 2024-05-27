import {
  SingleChoiceToggleGroup,
  useCellValue,
  usePublisher,
  viewMode$,
} from "@mdxeditor/editor";

const token = `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`;

export const DiffSourceToggleWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // access the viewMode node value
  const viewMode = useCellValue(viewMode$);

  // a function that will publish a new value into the viewMode cell
  const changeViewMode = usePublisher(viewMode$);

  return (
    <>
      {viewMode === "rich-text" ? (
        children
      ) : viewMode === "diff" ? (
        <span>Diff mode</span>
      ) : (
        <span>Source mode</span>
      )}

      <div style={{ marginLeft: "auto" }}>
        <SingleChoiceToggleGroup
          value={viewMode}
          items={[
            { title: "Rich text", contents: "RichIcon", value: "rich-text" },
            { title: "Diff mode", contents: "Diff Icon", value: "diff" },
            { title: "Source", contents: "Sourch Icon", value: "source" },
          ]}
          onChange={(value) => changeViewMode(value || "rich-text")}
        />
      </div>
    </>
  );
};
