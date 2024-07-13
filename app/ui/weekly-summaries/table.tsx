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
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-[#f7f3e8] shadow">
        <table className="w-full">
          <thead className="bg-[#e6e0d0]">
            <tr>
              <th scope="col" className="w-2/3 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Week Ending
              </th>
              <th scope="col" className="w-1/3 px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Summary
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklySummaries.map((summary) => (
              <tr key={summary.id} className="border-b border-gray-200 last:border-b-0">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatDateToLocal(summary.weekEnding)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button 
                    onClick={() => handleView(summary.summary)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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