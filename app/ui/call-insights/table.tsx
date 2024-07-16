'use client'
import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import Popup from '@/app/ui/popup';
import { DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';


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
      title: "Talked about bad day at work",
      summary: "This is a summary of the first call. It can be quite long and detailed, providing an overview of the key points discussed during the therapy session.",
      transcript: "This is the transcript of the first call. It contains the full dialogue between the therapist and the client, capturing every word exchanged during the session. The transcript can be very lengthy, often spanning several paragraphs or pages.",
    },
    {
      id: 2,
      date: "2024-07-14",
      time: "11:00 AM",
      title: "Angery at friend for not showing up",
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
        <table className="min-w-full divide-y bg-[#f7f3e8]">
          <thead className= "bg-[#e6e0d0]">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider" colSpan={2}>
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calls?.map((call) => (
              <tr key={call.id} className="hover:bg-[#EBE5D3]  transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-500">
                  {formatDateToLocal(call.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center" colSpan={2}>
                  <div className="flex justify-center space-x-4">
                  <button 
                      onClick={() => handleView('summary', call.summary)}
                      className="px-3 py-1 bg-green-100 text-green-500 rounded-full hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center"
                    >
                      <LightBulbIcon className="w-4 h-4 mr-1" />
                      Insights
                    </button>
                    <button 
                      onClick={() => handleView('transcript', call.transcript)}
                      className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full hover:bg-green-200 transition-colors duration-200 text-sm font-medium flex items-center"
                    >
                      <DocumentTextIcon className="w-4 h-4 mr-1" />
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