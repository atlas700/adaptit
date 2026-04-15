import {
  ArrowUpRightIcon,
  BrainCircuitIcon,
  Layers3Icon,
  PlaySquareIcon,
  SparklesIcon,
} from "lucide-react";

import { CreateLearningPathDialog } from "@/components/create-learning-path-dialog";
import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const readinessItems = [
  {
    title: "Roadmap generator",
    description: "Schema is ready to support workspace-scoped learning paths and module ordering.",
    badge: "Ready",
  },
  {
    title: "Lesson renderer",
    description: "Text, visual, and video lesson formats are represented and ready for service wiring.",
    badge: "Next",
  },
  {
    title: "Adaptive progress",
    description: "Progress and quiz attempts are modeled and can feed difficulty adaptation later.",
    badge: "Modeled",
  },
];

const systemSignals = [
  {
    label: "Learning paths",
    value: "12",
    note: "workspace-scoped records already supported",
  },
  {
    label: "Formats",
    value: "3",
    note: "text, visual, and video lesson modes",
  },
  {
    label: "Core layers",
    value: "2",
    note: "Next app plus shared Drizzle package",
  },
];

export default function Home() {
  return (
    <DashboardShell>
      <div className="relative flex flex-1 flex-col">
        <div className="pointer-events-none absolute top-0 right-0 size-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 size-60 rounded-full bg-accent/80 blur-3xl" />

        <main className="relative flex flex-1 flex-col gap-6 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <section className="relative overflow-hidden rounded-[calc(var(--radius-4xl)+2px)] border border-border/70 bg-card/90 px-6 py-7 shadow-sm sm:px-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="flex max-w-3xl flex-col gap-5">
                <Badge variant="secondary">Design system foundation live</Badge>
                <div className="flex flex-col gap-3">
                  <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                    Adaptit now has the UI foundation for a real learning-product workflow.
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Shadcn primitives, a reusable workspace shell, and a bold token system are in place.
                    The next slice can focus on real learning path creation instead of rebuilding the UI stack.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <CreateLearningPathDialog />
                  <Button size="lg" variant="outline">
                    Inspect dashboard shell
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[32rem]">
                {systemSignals.map((signal) => (
                  <div
                    className="flex flex-col gap-2 rounded-3xl border border-border/70 bg-background/80 px-4 py-4"
                    key={signal.label}
                  >
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      {signal.label}
                    </span>
                    <span className="font-heading text-3xl font-semibold tracking-tight">
                      {signal.value}
                    </span>
                    <p className="text-sm leading-5 text-muted-foreground">{signal.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="border-border/70 bg-card/92 shadow-sm">
              <CardHeader className="gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Current focus</Badge>
                  <Badge variant="secondary">Workspace shell</Badge>
                </div>
                <CardTitle className="font-heading text-2xl tracking-tight">
                  Implementation runway
                </CardTitle>
                <CardDescription>
                  The foundation is now biased toward app UI instead of starter-template markup.
                  These are the product slices the current schema and shell are ready to support.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border border-border/70 bg-background/90 p-4">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Layers3Icon />
                    </div>
                    <h2 className="font-medium">Learning path CRUD</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Create, list, and update learning paths inside a single workspace boundary.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border/70 bg-background/90 p-4">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <PlaySquareIcon />
                    </div>
                    <h2 className="font-medium">Lesson format surfaces</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Text, visual, and video outputs can each get dedicated composition patterns.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-border/70 bg-background/90 p-4">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <BrainCircuitIcon />
                    </div>
                    <h2 className="font-medium">Adaptive signals</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Progress and quiz data can inform remediation, sequencing, and pacing later.
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="flex flex-col gap-3">
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                      Product shell notes
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">
                      The sidebar, top bar, dialog primitives, and token system are now shared assets.
                      Future screens should compose from these primitives instead of adding new visual rules ad hoc.
                    </p>
                  </div>
                  <div className="grid gap-3 rounded-3xl border border-dashed border-border bg-background/80 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Creation flow skeleton</span>
                      <Badge variant="secondary">Queued</Badge>
                    </div>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card/92 shadow-sm">
              <CardHeader className="gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Pipeline readiness</Badge>
                  <SparklesIcon className="size-4 text-primary" />
                </div>
                <CardTitle className="font-heading text-2xl tracking-tight">
                  Platform signals
                </CardTitle>
                <CardDescription>
                  The current repository is small, but the schema already covers the key product
                  boundaries needed for the next implementation pass.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {readinessItems.map((item, index) => (
                  <div className="flex flex-col gap-4" key={item.title}>
                    {index > 0 ? <Separator /> : null}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <h2 className="font-medium">{item.title}</h2>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <Badge variant={index === 0 ? "default" : "outline"}>{item.badge}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-between gap-3 border-t border-border/70">
                <span className="text-sm text-muted-foreground">
                  Recommended next build: workspace-scoped learning path dashboard.
                </span>
                <Button variant="outline">Open next slice</Button>
              </CardFooter>
            </Card>
          </section>
        </main>
      </div>
    </DashboardShell>
  );
}
