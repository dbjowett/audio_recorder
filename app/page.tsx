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
    <div className="m-auto flex flex-col items-center pl-2 pr-2">
      <Particles className="absolute inset-0 -z-10 " />
      <PageHeader>
        <PageHeaderHeading>Audio recorder with local storage.</PageHeaderHeading>
        <PageHeaderDescription>100% stored in browser storage</PageHeaderDescription>
        <PageHeaderSubHeading className="mt-2 text-xs">
          ⚠️ Works best on Chrome due to experimental web APIs ⚠️
        </PageHeaderSubHeading>
      </PageHeader>
      <div className="max-w-[900px] w-full ">
        <Recorder />
        <AudioFileTable />
      </div>
    </div>
  );
}
