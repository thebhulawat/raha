'use client';
import { useState, useEffect } from 'react';
import { formatDateToLocal } from '@/lib/utils';
import InsightsPopup from '@/components/custom/call-insights/insight-modal';
import TranscriptModal from '@/components/custom/call-insights/transcript-modal';
import Popup from '@/components/custom/popup';
import { DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@clerk/nextjs';
import { getCalls, Call } from '@/api/calls';
import { SampleCalls } from '@/lib/sample-data';
import { InvoicesTableSkeleton } from '../skeletons';

export default function CallsTable({ currentPage }: { currentPage: number }) {
  const [viewContent, setViewContent] = useState<{
    type: string;
    content: any;
  } | null>(null);
  const { getToken } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  //const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const fetchedCalls = await getCalls(getToken);
        setCalls([...SampleCalls, ...fetchedCalls]);
      } catch (error) {
        console.error('Error fetching calls:', error);
        //setError('Failed to fetch calls')
        //setCalls([])
      }
    };
    fetchCalls();
  }, [getToken]);

  const handleView = (type: 'insights' | 'transcript', content: any) => {
    setViewContent({ type, content });
  };

  const closePopup = () => {
    setViewContent(null);
  };

  if (calls.length === 0) {
    return <InvoicesTableSkeleton />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y bg-[#f7f3e8]">
          <thead className="bg-[#e6e0d0]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                colSpan={2}
              >
                View
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {calls.map((call: Call) => (
              <tr
                key={`${call.date}-${call.time}-${call.title}`}
                className="hover:bg-[#F6F3E8] transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-sm text-gray-500">
                  {formatDateToLocal(call.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {call.title}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-center"
                  colSpan={2}
                >
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleView('insights', call.insights)}
                      className="px-3 py-1 bg-green-100 text-green-500 rounded-full hover:bg-green-200 transition-colors duration-200 text-sm font-medium flex items-center"
                    >
                      <LightBulbIcon className="w-4 h-4 mr-1" />
                      Insights
                    </button>
                    <button
                      onClick={() => handleView('transcript', call.transcript)}
                      className="px-3 py-1 bg-blue-100 text-blue-500 rounded-full hover:bg-blue-200 transition-colors duration-200 text-sm font-medium flex items-center"
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
      <InsightsPopup
        isOpen={viewContent?.type === 'insights'}
        onClose={closePopup}
        insights={viewContent?.content || []}
      />
      <TranscriptModal
        isOpen={viewContent?.type === 'transcript'}
        onClose={closePopup}
        transcript={viewContent?.content || ''}
      />
    </div>
  );
}
