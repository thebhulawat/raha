import { Call } from '@/api/calls';

export const SampleCalls: Call[] = [
  {
    id: 1,
    date: '2024-07-14',
    time: '10:00 AM',
    title: 'Sample Call - Talked about bad day at work',
    insights: [
      {
        title: 'Emotional Pattern Recognition',
        description:
          'You tend to experience heightened anxiety on Sunday evenings, which may be linked to anticipation of the upcoming work week. Consider implementing a relaxing Sunday evening routine to ease this transition.',
        emoji: '🔄',
      },
      {
        title: 'Behavioral Insight',
        description:
          "You've shown a tendency to avoid confrontation. Gradually practicing assertiveness in low-stakes situations could lead to more fulfilling relationships and improved self-advocacy.",
        emoji: '🗣️',
      },
      {
        title: 'Cognitive Restructuring Opportunity',
        description:
          "I've noticed you often engage in 'catastrophizing' when facing challenges. By recognizing this thought pattern, we can work on reframing these situations more realistically, potentially reducing your anxiety levels.",
        emoji: '🧠',
      },
    ],
    transcript: [
      {
        role: 'Raha',
        content: 'Hello, there. How are you feeling today?',
      },
      {
        role: 'You',
        content:
          "Hi, not great to be honest. I had a really bad day at work yesterday and I'm still feeling frustrated about it.",
      },
      {
        role: 'Raha',
        content:
          "I'm sorry to hear that. Can you tell me more about what happened?",
      },
      {
        role: 'You',
        content:
          'Well, I had been working on this project for weeks, and during the team meeting, my boss completely dismissed all my ideas without even really listening to them. It made me feel so undervalued and angry.',
      },
      {
        role: 'Raha',
        content:
          "That sounds very frustrating. It's understandable to feel upset when you feel your hard work isn't being recognized. How did you react in the moment?",
      },
      {
        role: 'You',
        content:
          "I didn't say anything. I just sat there, trying to keep my composure. But inside, I was fuming.",
      },
      {
        role: 'Raha',
        content:
          "I see. It sounds like you're experiencing some conflict between your internal feelings and external reactions. Let's explore that a bit more...",
      },
    ],
  },
];
