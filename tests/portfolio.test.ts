import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";

import { links, practice, projects, site } from "../content/site";
import { assertPublishedDocs } from "../scripts/check-docs";

test("site module has identity, work, and contact", () => {
  expect(site.name.length).toBeGreaterThan(0);
  expect(site.fullName.length).toBeGreaterThan(site.name.length);
  for (const part of site.name.split(" ")) {
    expect(site.fullName).toContain(part);
  }
  expect(site.email).toContain("@");
  expect(site.location.length).toBeGreaterThan(0);
  expect(site.company.length).toBeGreaterThan(0);
  expect(site.github).toContain("github.com/donaldfilimon");
  expect(projects.length).toBeGreaterThanOrEqual(6);
  expect(projects.some((project) => project.public && project.href)).toBe(true);
  expect(links.some((link) => link.href === `mailto:${site.email}`)).toBe(true);
  expect(links.some((link) => link.href === site.github)).toBe(true);
  expect(practice.length).toBeGreaterThanOrEqual(3);
});

test("home page is composed from the site module, not a redirect", () => {
  const page = readFileSync("app/page.tsx", "utf8");
  expect(page).toContain('from "@/content/site"');
  expect(page).toContain("{site.name}");
  expect(page).toContain("{site.lede}");
  expect(page).toContain('id="work"');
  expect(page).toContain('id="contact"');
  expect(page).toContain("projects.map");
  expect(page).toContain("links.map");
  expect(page).not.toContain("location.replace");
  expect(page).not.toContain("star-space-portfolio");
});

test("published docs/ is the site module rendered, not a bounce page", () => {
  const html = assertPublishedDocs(".");
  expect(html).toContain(site.name);
  expect(html).toContain(site.fullName);
  expect(html).toContain(site.email);
  expect(html).toContain(site.lede);
  expect(html).toContain(`mailto:${site.email}`);
  expect(html).toContain(site.github);
  for (const project of projects) {
    expect(html).toContain(project.name);
    expect(html).toContain(project.summary);
  }
  for (const link of links) {
    expect(html).toContain(link.href);
  }
});
