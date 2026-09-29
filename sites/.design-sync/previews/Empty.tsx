import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Button,
} from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 520,
};

export const NoResults = () => (
  <div style={paper}>
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No projects match that filter</EmptyTitle>
        <EmptyDescription>
          Try a broader category, or clear the filter to see every engagement.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">Clear filter</Button>
      </EmptyContent>
    </Empty>
  </div>
);

export const WithMedia = () => (
  <div style={paper}>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <span aria-hidden="true">📁</span>
        </EmptyMedia>
        <EmptyTitle>Nothing archived yet</EmptyTitle>
        <EmptyDescription>
          Completed work moves here once its case study is published.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  </div>
);
