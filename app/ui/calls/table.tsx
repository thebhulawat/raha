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
      date: "11-07-2024",
      time: "10:00 AM",
      summary: "This is a summary of the first call. It can be quite long and detailed, providing an overview of the key points discussed during the therapy session.",
      transcript: "This is the transcript of the first call. It contains the full dialogue between the therapist and the client, capturing every word exchanged during the session. The transcript can be very lengthy, often spanning several paragraphs or pages.",
    },
    {
      id: 2,
      date: "11-07-2024",
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
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {calls?.map((call) => (
              <div
                key={call.id}
                className="mb-2 w-full rounded-md bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatDateToLocal(call.date)}</p>
                    <p className="text-sm text-gray-500">{call.time}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <button 
                    onClick={() => handleView('summary', call.summary)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300"
                  >
                    View Summary
                  </button>
                  <button 
                    onClick={() => handleView('transcript', call.transcript)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-600 transition duration-300"
                  >
                    View Transcript
                  </button>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Time
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Summary
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Transcript
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {calls?.map((call) => (
                <tr
                  key={call.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {formatDateToLocal(call.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {call.time}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button 
                      onClick={() => handleView('summary', call.summary)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-300"
                    >
                      View
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <button 
                      onClick={() => handleView('transcript', call.transcript)}
                      className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-green-600 transition duration-300"
                    >
                      View
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
        title={viewContent?.type === 'summary' ? 'Call Summary' : 'Call Transcript'}
        content={viewContent?.content || ''}
      />
    </div>
  );
}