'use client'
import { useState } from 'react';
import { formatDateToLocal } from '@/app/lib/utils';
import InsightsPopup from '@/app/ui/call-insights/insight-modal';
import TranscriptModal from '@/app/ui/call-insights/transcript-modal';
import Popup from '@/app/ui/popup';
import { DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline';

interface Insight {
  title: string;
  description: string;
  emoji: string
}

interface Transcript {
  speaker: string;
  content: string;
}

interface Call {
  id: number;
  date: string;
  time: string;
  title: string;
  insights: Insight[];
  transcript: Transcript[];
}

export default function CallsTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const [viewContent, setViewContent] = useState<{ type: string; content: any } | null>(null);

  const calls: Call[] = [
    {
      id: 1,
      date: "2024-07-14",
      time: "10:00 AM",
      title: "Talked about bad day at work",
      insights: [
        {
          title: "Emotional Pattern Recognition",
          description: "You tend to experience heightened anxiety on Sunday evenings, which may be linked to anticipation of the upcoming work week. Consider implementing a relaxing Sunday evening routine to ease this transition.",
          emoji: "🔄"
        },
        {
          title: "Behavioral Insight",
          description: "You've shown a tendency to avoid confrontation. Gradually practicing assertiveness in low-stakes situations could lead to more fulfilling relationships and improved self-advocacy.",
          emoji: "🗣️"
        },
        {
          title: "Cognitive Restructuring Opportunity",
          description: "I've noticed you often engage in 'catastrophizing' when facing challenges. By recognizing this thought pattern, we can work on reframing these situations more realistically, potentially reducing your anxiety levels.",
          emoji: "🧠"
        }
      ],
      transcript: [
        { speaker: "Raha", content: "Hello, Naman. How are you feeling today?" },
        { speaker: "Naman", content: "Hi, not great to be honest. I had a really bad day at work yesterday and I'm still feeling frustrated about it." },
        { speaker: "Raha", content: "I'm sorry to hear that. Can you tell me more about what happened?" },
        { speaker: "Naman", content: "Well, I had been working on this project for weeks, and during the team meeting, my boss completely dismissed all my ideas without even really listening to them. It made me feel so undervalued and angry." },
        { speaker: "Raha", content: "That sounds very frustrating. It's understandable to feel upset when you feel your hard work isn't being recognized. How did you react in the moment?" },
        { speaker: "Naman", content: "I didn't say anything. I just sat there, trying to keep my composure. But inside, I was fuming." },
        { speaker: "Raha", content: "I see. It sounds like you're experiencing some conflict between your internal feelings and external reactions. Let's explore that a bit more..." },
      ],
    },
  ];

  const handleView = (type: 'insights' | 'transcript', content: any) => {
    setViewContent({ type, content });
  };

  const closePopup = () => {
    setViewContent(null);
  };

  return (
    <div className="mt-6 flow-root">
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y bg-[#f7f3e8]">
          <thead className="bg-[#e6e0d0]">
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
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-[#F6F3E8] transition-colors duration-200">
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