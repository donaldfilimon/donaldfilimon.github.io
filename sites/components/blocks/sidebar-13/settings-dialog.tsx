"use client"

import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { BellIcon, MenuIcon, HomeIcon, PaintbrushIcon, MessageCircleIcon, GlobeIcon, KeyboardIcon, CheckIcon, VideoIcon, LinkIcon, LockIcon, SettingsIcon } from "lucide-react"

const data = {
  nav: [
    {
      name: "Notifications",
      icon: (
        <BellIcon
        />
      ),
    },
    {
      name: "Navigation",
      icon: (
        <MenuIcon
        />
      ),
    },
    {
      name: "Home",
      icon: (
        <HomeIcon
        />
      ),
    },
    {
      name: "Appearance",
      icon: (
        <PaintbrushIcon
        />
      ),
    },
    {
      name: "Messages & media",
      icon: (
        <MessageCircleIcon
        />
      ),
    },
    {
      name: "Language & region",
      icon: (
        <GlobeIcon
        />
      ),
    },
    {
      name: "Accessibility",
      icon: (
        <KeyboardIcon
        />
      ),
    },
    {
      name: "Mark as read",
      icon: (
        <CheckIcon
        />
      ),
    },
    {
      name: "Audio & video",
      icon: (
        <VideoIcon
        />
      ),
    },
    {
      name: "Connected accounts",
      icon: (
        <LinkIcon
        />
      ),
    },
    {
      name: "Privacy & visibility",
      icon: (
        <LockIcon
        />
      ),
    },
    {
      name: "Advanced",
      icon: (
        <SettingsIcon
        />
      ),
    },
  ],
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>Open Dialog</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === "Messages & media"}
                          render={<a href="#" />}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
