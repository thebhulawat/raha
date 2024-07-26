import Table from '@/components/custom/call-insights/table';
import { lusitana } from '@/app/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/components/custom/skeletons';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Calls'
// }

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Calls</h1>
      </div>
      <Suspense key={currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table currentPage={currentPage} />
      </Suspense>
      {/* TODO */}
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
