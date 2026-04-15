import { WandSparklesIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function CreateLearningPathDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">
          <WandSparklesIcon data-icon="inline-start" />
          New learning path
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create the next learning path</DialogTitle>
          <DialogDescription>
            This placeholder flow exercises the form primitives that the real
            workspace builder will use next.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Path title</Label>
              <Input
                defaultValue="Systems Thinking for Product Teams"
                id="title"
                placeholder="Enter a learning path title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="topic">Core topic</Label>
              <Input
                defaultValue="Decision-making under uncertainty"
                id="topic"
                placeholder="What should the learner master?"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Difficulty</Label>
              <Select defaultValue="intermediate">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Primary format</Label>
              <Select defaultValue="visual">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="text">Text-first lessons</SelectItem>
                    <SelectItem value="visual">Visual diagrams</SelectItem>
                    <SelectItem value="video">Video script workflow</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="audience">Audience context</Label>
            <Textarea
              defaultValue="For product managers and operations leads who need a shared language for diagnosing learning gaps."
              id="audience"
              placeholder="Who is this path for and what context should the AI respect?"
            />
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline">Save as draft shell</Button>
          <Button>Start structuring modules</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
