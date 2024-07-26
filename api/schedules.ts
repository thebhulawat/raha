const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ScheduleData {
  time: string;
  scheduleFrequency: string;
  scheduleDays: boolean[];
  timezone: string;
}

export async function createOrUpdateSchedule(
  scheduleData: ScheduleData,
  getToken: () => Promise<String | null>
) {
  const token = await getToken();
  if (!token) throw new Error('No authentication token available');

  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(scheduleData),
  });

  if (!response.ok) {
    throw new Error('Failed to create or update schedule');
  }

  return response.json();
}
