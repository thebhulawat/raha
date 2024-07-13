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
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week Ending
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {weeklySummaries.map((summary) => (
              <tr key={summary.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateToLocal(summary.weekEnding)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => handleView(summary.summary)}
                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
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