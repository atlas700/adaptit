"use client";

import Link from "next/link";
import {
  BrainCircuitIcon,
  ChevronsUpDownIcon,
  CircleHelpIcon,
  CreditCardIcon,
  GaugeIcon,
  Layers3Icon,
  RouteIcon,
  Settings2Icon,
  SparklesIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

type DashboardShellProps = Readonly<{
  children: React.ReactNode;
}>;

const primaryNavigation = [
  { href: "#", label: "Learning Paths", icon: RouteIcon, isActive: true, badge: "12" },
  { href: "#", label: "Lesson Studio", icon: Layers3Icon, badge: "3" },
  { href: "#", label: "Adaptive Signals", icon: BrainCircuitIcon, badge: "AI" },
  { href: "#", label: "Progress", icon: GaugeIcon },
];

const supportNavigation = [
  { href: "#", label: "Billing", icon: CreditCardIcon },
  { href: "#", label: "Workspace", icon: Settings2Icon },
  { href: "#", label: "Help", icon: CircleHelpIcon },
];

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarHeader className="gap-4 px-3 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sm">
              <SparklesIcon />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate font-heading text-sm font-semibold tracking-tight">
                Adaptit
              </span>
              <span className="truncate text-xs text-sidebar-foreground/70">
                Product foundation
              </span>
            </div>
            <Badge className="shrink-0" variant="secondary">
              v0
            </Badge>
          </div>
          <SidebarInput placeholder="Search roadmap blocks..." />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {primaryNavigation.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Operations</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {supportNavigation.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-3 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full justify-between" size="lg" variant="outline">
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    A
                  </span>
                  <span className="flex min-w-0 flex-col items-start">
                    <span className="truncate text-sm font-medium">Ariana Malik</span>
                    <span className="truncate text-xs text-muted-foreground">
                      Solo workspace
                    </span>
                  </span>
                </span>
                <ChevronsUpDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Workspace menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Workspace settings</DropdownMenuItem>
                <DropdownMenuItem>Invite collaborators</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Theme tokens</DropdownMenuItem>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="overflow-hidden">
        <header className="sticky top-0 z-10 border-b border-border/80 bg-background/90 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="flex flex-col">
                <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Learning workspace
                </span>
                <span className="font-heading text-sm font-semibold tracking-tight sm:text-base">
                  Dashboard shell
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Shadcn live</Badge>
              <Button size="sm">New learning path</Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
