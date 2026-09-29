import {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
  Button,
} from "sites-project";

const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 480,
};

export const CaseStudyList = () => (
  <div style={paper}>
    <ItemGroup>
      <Item>
        <ItemMedia variant="icon">
          <span aria-hidden="true">🧠</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>ABI</ItemTitle>
          <ItemDescription>
            Claim-honest cognitive and governance runtime for local AI systems.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            View
          </Button>
        </ItemActions>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemMedia variant="icon">
          <span aria-hidden="true">🗄</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>WDBX</ItemTitle>
          <ItemDescription>
            Provenance-aware episodic substrate with MVCC and a causal DAG.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            View
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  </div>
);

export const OutlineWithHeaderFooter = () => (
  <div style={paper}>
    <Item variant="outline">
      <ItemContent>
        <ItemHeader>
          <ItemTitle>Evidence-Led Hardening</ItemTitle>
          <span style={{ fontSize: 12, color: "#6b7280" }}>03</span>
        </ItemHeader>
        <ItemDescription>
          Turn a working prototype into a system whose tests and artifacts
          support the claims made about it.
        </ItemDescription>
        <ItemFooter>
          <span style={{ fontSize: 12, color: "#6b7280" }}>Related: HydroCycle, WDBX</span>
          <Button size="sm" variant="ghost">
            Read more
          </Button>
        </ItemFooter>
      </ItemContent>
    </Item>
  </div>
);

export const MutedCompactList = () => (
  <div style={paper}>
    <ItemGroup>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <span aria-hidden="true">01</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Frame</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <span aria-hidden="true">02</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Build</ItemTitle>
        </ItemContent>
      </Item>
      <Item variant="muted" size="sm">
        <ItemMedia variant="icon">
          <span aria-hidden="true">03</span>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Prove</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  </div>
);
