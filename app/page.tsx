'use client';
import { Recorder } from '@/components/Recorder';

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderSubHeading,
} from '@/components/ui/page';

import { Particles } from '@/components/Particles';
import { AudioFileTable } from '@/components/Table';
export default function Home() {
  return (
    <div className="container flex-1 flex flex-col justify-center items-center min-h-screen m-auto">
      <Particles className="absolute inset-0 -z-10 " />
      <PageHeader>
        <PageHeaderHeading>Audio recorder with local storage.</PageHeaderHeading>
        <PageHeaderDescription>100% stored in browser storage</PageHeaderDescription>
        <PageHeaderSubHeading className="mt-2 text-xs">
          ⚠️ Works best on Chrome due to experimental web APIs ⚠️
        </PageHeaderSubHeading>
      </PageHeader>
      <div className="max-w-[900px] w-full">
        <Recorder />
        <AudioFileTable />
      </div>
    </div>
  );
}
