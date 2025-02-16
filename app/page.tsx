'use client';
import { Particles } from '@/components/Particles';
import { Recorder } from '@/components/Recorder';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderSubHeading,
} from '@/components/ui/page';

import { AudioFileTable } from '@/components/Table';
export default function Home() {
  return (
    <div className="container relative flex-1 flex flex-col justify-center items-center min-h-screen">
      <Particles className="absolute inset-0 -z-10 " />
      <PageHeader>
        <PageHeaderHeading>Audio recorder with local storage.</PageHeaderHeading>
        <PageHeaderDescription>100% stored in browser storage</PageHeaderDescription>
        <PageHeaderSubHeading className="mt-2 text-xs">
          (Works best on Chrome due to experimental web APIs)
        </PageHeaderSubHeading>
      </PageHeader>
      <div className="max-w-[900px] w-full">
        <Recorder />
        <AudioFileTable />
      </div>
    </div>
  );
}
