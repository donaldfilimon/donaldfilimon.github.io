import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "sites-project";

/**
 * Checkbox is a bare Base UI indicator with no label of its own, so every
 * real use pairs it with the DS's own Field primitives (the shadcn-style
 * horizontal Field: Checkbox + FieldContent as siblings) rather than a raw
 * <label>. Content is drawn from the case-study "kind" taxonomy and the
 * evidence-led-hardening service in content/site.ts.
 *
 * `indeterminate` is deliberately NOT shown: the component's className only
 * has `data-checked:` selectors, no `data-indeterminate:` rule, so an
 * indeterminate-only box (checked=false, indeterminate=true) mounts the
 * check icon with none of the primary fill/border — it would read as a
 * broken checkbox rather than a mixed state. Logged in learnings.
 */
const paper = {
  background: "#fff",
  color: "#14161b",
  fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  padding: 28,
  borderRadius: 12,
  maxWidth: 420,
};

export const FilterOptions = () => (
  <div style={paper}>
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="filter-ai" defaultChecked />
        <FieldLabel htmlFor="filter-ai">AI systems architecture</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="filter-native" defaultChecked />
        <FieldLabel htmlFor="filter-native">Native systems</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="filter-product" />
        <FieldLabel htmlFor="filter-product">Applied product engineering</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="filter-lab" />
        <FieldLabel htmlFor="filter-lab">Lab</FieldLabel>
      </Field>
    </FieldGroup>
  </div>
);

export const WithDescription = () => (
  <div style={paper}>
    <Field orientation="horizontal">
      <Checkbox id="notify" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="notify">Notify me about new case studies</FieldLabel>
        <FieldDescription>
          Occasional updates when a new engagement publishes — no more than monthly.
        </FieldDescription>
      </FieldContent>
    </Field>
  </div>
);

export const Disabled = () => (
  <div style={paper}>
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="legacy" disabled />
        <FieldLabel htmlFor="legacy">Legacy stack support — discontinued</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="hardening" defaultChecked disabled />
        <FieldLabel htmlFor="hardening">Evidence-led hardening — included by default</FieldLabel>
      </Field>
    </FieldGroup>
  </div>
);
