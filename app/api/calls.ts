const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function call(token: string) {
  const response = await fetch(`${API_BASE_URL}/calls`, {
    method: 'POST',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to schedule a call');
  }

  return response.json();
}