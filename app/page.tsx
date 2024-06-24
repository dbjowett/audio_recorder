import { Recorder } from "@/components/Recorder";
import { Particles } from "@/components/Particles";
import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/ui/page";
import { Github } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="container relative flex-1 flex flex-col justify-center items-center min-h-screen">
      <Particles className="absolute inset-0 -z-10 " />
      <PageHeader>
        <PageHeaderHeading>
          Audio recorder with local storage.
        </PageHeaderHeading>
        <Recorder />
        <PageHeaderDescription>
          Record audio files but keep them stored locally on your computer.
        </PageHeaderDescription>
        <PageActions>
          <Link
            target="_blank"
            rel="noreferrer"
            href={`https://github.com/dbjowett/audio-recorder`}
          >
            <Button variant={"secondary"} className="border-2">
              <Github className="mr-2" size={20} /> <span>Source code</span>{" "}
            </Button>
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  );
}
