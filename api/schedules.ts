const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ScheduleRequest {
  time: string;
  scheduleFrequency: string;
  scheduleDays: boolean[];
  timezone: string;
}

export interface ScheduleResponse {
  time: string;
  scheduleFrequency: string;
  scheduleDays: boolean[];
}

export async function getSchedule(
  getToken: () => Promise<String | null>
): Promise<ScheduleResponse> {
  const token = await getToken();
  if (!token) throw new Error('No authentication token available');

  const response = await fetch(`${API_BASE_URL}/schedules`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Schedule not found for this user');
    }
    throw new Error('Failed to retrieve schedule');
  }

  return response.json();
}

export async function createOrUpdateSchedule(
  scheduleData: ScheduleRequest,
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
