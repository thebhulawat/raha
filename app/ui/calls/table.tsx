'use client'
import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import Popup from '@/app/ui/popup';

export default function CallsTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const [viewContent, setViewContent] = useState<{ type: string; content: string } | null>(null);

  const calls = [
    {
      id: 1,
      date: "2024-07-14",
      time: "10:00 AM",
      summary: "This is a summary of the first call. It can be quite long and detailed, providing an overview of the key points discussed during the therapy session.",
      transcript: "This is the transcript of the first call. It contains the full dialogue between the therapist and the client, capturing every word exchanged during the session. The transcript can be very lengthy, often spanning several paragraphs or pages.",
    },
    {
      id: 2,
      date: "2024-07-14",
      time: "11:00 AM",
      summary: "This is a summary of the second call. Like the first, it provides a concise overview of the main topics and insights from the therapy session.",
      transcript: "This is the transcript of the second call. As with the first, it's a verbatim record of the entire conversation that took place during the therapy session, preserving all the details and nuances of the dialogue.",
    },
  ];

  const handleView = (type: 'summary' | 'transcript', content: string) => {
    setViewContent({ type, content });
  };

  const closePopup = () => {
    setViewContent(null);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-[#f7f3e8]">
          <thead className="bg-[#e6e0d0]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={2}>
                View
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {calls?.map((call) => (
              <tr key={call.id} className="hover:bg-[#ebe5d3] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatDateToLocal(call.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {call.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={2}>
                  <div className="flex justify-center space-x-4">
                    <button 
                      onClick={() => handleView('summary', call.summary)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 text-sm font-medium"
                    >
                      Summary
                    </button>
                    <button 
                      onClick={() => handleView('transcript', call.transcript)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200 text-sm font-medium"
                    >
                      Transcript
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Popup
        isOpen={viewContent !== null}
        onClose={closePopup}
        title={viewContent?.type === 'summary' ? 'Call Summary' : 'Call Transcript'}
        content={viewContent?.content || ''}
      />
    </div>
  );
}