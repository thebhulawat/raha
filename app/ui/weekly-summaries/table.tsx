'use client'
import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import Popup from '@/app/ui/popup';

export default function WeeklySummariesTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const [viewContent, setViewContent] = useState<{ type: string; content: string } | null>(null);

  const weeklySummaries = [
    {
      id: 1,
      weekEnding: "2024-07-14",
      summary: "This is the summary for the week ending July 14, 2024. It provides an overview of the client's progress, key themes discussed in therapy sessions, and notable achievements or challenges faced during the week.",
    },
    {
      id: 2,
      weekEnding: "2024-07-21",
      summary: "This is the summary for the week ending July 21, 2024. It covers the main topics explored in therapy, any breakthroughs or setbacks experienced by the client, and recommendations for the coming week.",
    },
  ];

  const handleView = (content: string) => {
    setViewContent({ type: 'summary', content });
  };

  const closePopup = () => {
    setViewContent(null);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {weeklySummaries.map((summary) => (
              <div
                key={summary.id}
                className="mb-4 w-full rounded-md bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Week Ending: {formatDateToLocal(summary.weekEnding)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-end pt-4">
                  <button 
                    onClick={() => handleView(summary.summary)}
                    className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-600 transition duration-300"
                  >
                    View Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Week Ending
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Summary
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {weeklySummaries.map((summary) => (
                <tr
                  key={summary.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-gray-50 transition duration-300"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDateToLocal(summary.weekEnding)}
                  </td>
                  <td className="px-3 py-3">
                    <button 
                      onClick={() => handleView(summary.summary)}
                      className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-600 transition duration-300"
                    >
                      View Summary
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Popup
        isOpen={viewContent !== null}
        onClose={closePopup}
        title="Weekly Summary"
        content={viewContent?.content || ''}
      />
    </div>
  );
}