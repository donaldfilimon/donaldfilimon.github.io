import { readFileSync } from "node:fs";
import { expect, test } from "bun:test";

import { projectCatalog } from "../content/project-catalog";
import { links, nav, practice, projects, services, site } from "../content/site";
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
  expect(site.location).toBe("Land O’ Lakes, Florida");
  expect(site.availability).toContain("globally");
  expect(site.github).toContain("github.com/donaldfilimon");
  expect(projects.length).toBeGreaterThanOrEqual(6);
  expect(projects.some((project) => project.public && project.href)).toBe(true);
  expect(links.some((link) => link.href === `mailto:${site.email}`)).toBe(true);
  expect(links.some((link) => link.href === site.github)).toBe(true);
  expect(practice.length).toBeGreaterThanOrEqual(3);
  expect(projects.filter((project) => project.featured)).toHaveLength(8);
  expect(services).toHaveLength(3);
  expect(nav.every((item) => item.href.startsWith("/#"))).toBe(true);
  expect(projects.filter((project) => !project.public).every((project) => !project.href)).toBe(true);
});

test("home page is composed from the site module, not a redirect", () => {
  const page = readFileSync("app/page.tsx", "utf8");
  expect(page).toContain('from "@/content/site"');
  expect(page).toContain("{site.name}");
  expect(page).toContain("{site.lede}");
  expect(page).toContain('id="work"');
  expect(page).toContain('id="services"');
  expect(page).toContain('id="contact"');
  expect(page).toContain("featuredProjects.map");
  expect(page).toContain("<PersonalizedWork projects={projectCatalog}");
  expect(page).toContain("<ProjectAtlas projects={projectCatalog}");
  expect(page).toContain('id="atlas"');
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
  expect(html).toContain(site.location);
  expect(html).not.toContain("Ocala");
  expect(html).toContain(`mailto:${site.email}`);
  expect(html).toContain(site.github);
  expect(html).toContain("PROJECT ATLAS");
  expect(html).toContain("Recommended for you");
  expect(html).toContain("privacy-bounded project identities");
  expect(html).toContain("65");
  for (const project of projectCatalog) {
    expect(html).toContain(project.displayName);
  }
  for (const project of projects) {
    expect(html).toContain(project.summary);
    if (project.public) {
      expect(project.href).toBeTruthy();
      expect(html).toContain(`href="${project.href}"`);
    } else {
      expect(project.href).toBeUndefined();
    }
  }
  expect(html).not.toContain("github.com/donaldfilimon/CoreAIAssistant");
  expect(html).not.toContain("github.com/donaldfilimon/Mixed");
  expect(html).not.toContain("github.com/donaldfilimon/custom-perfections");
  for (const link of links) {
    expect(html).toContain(link.href);
  }
  const notFound = readFileSync("docs/404.html", "utf8");
  for (const item of nav) {
    expect(notFound).toContain(`href="${item.href}"`);
  }
});
