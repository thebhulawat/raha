import moment from 'moment-timezone';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Message {
  role: string;
  content: string;
}

export interface Insight {
  title: string;
  description: string;
  emoji: string;
}

export interface Call {
  id?: number;
  date: string;
  time: string;
  title: string;
  insights: Insight[];
  transcript: Message[];
}

export async function getCalls(
  getToken: () => Promise<String | null>
): Promise<Call[]> {
  const token = await getToken();
  if (!token) throw new Error('No authentication token available');
  const response = await fetch(`${API_BASE_URL}/calls`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch calls');
  }

  const data = await response.json();

  return data.map((call: any) => ({
    id: call.id,
    date: call.date,
    time: moment.utc(call.time, 'HH:mm').local().format('h:mm A'),
    title: call.title,
    insights: call.insights,
    transcript: call.transcript,
  }));
}

export async function createCall(getToken: () => Promise<String | null>) {
  const token = await getToken();
  if (!token) throw new Error('No authentication token available');

  const response = await fetch(`${API_BASE_URL}/calls`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to schedule a call');
  }

  return response.json();
}
