import Pagination from '@/app/ui/pagination';
import WeeklySummariesTable from '@/app/ui/weekly-summaries/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
//import { fetchWeeklySummariesPages } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekly Summaries'
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchWeeklySummariesPages()
  // Todo update this later

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Weekly Summaries</h1>
      </div>
      <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
        <WeeklySummariesTable currentPage={currentPage} />
      </Suspense>
      {/* TODO */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}