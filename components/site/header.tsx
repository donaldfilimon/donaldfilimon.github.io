"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="font-mono text-[0.7rem] tracking-[0.22em] uppercase"
        >
          {site.name}
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Button key={item.href} variant="ghost" size="sm" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              className="md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>{site.name}</SheetTitle>
            </SheetHeader>
            <Separator />
            <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
              {nav.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="justify-start"
                  asChild
                >
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
