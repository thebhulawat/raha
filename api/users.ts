const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  clerkId: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  subscriptionStatus: string;
  freeCallsLeft: number;
}

export async function getUser(getToken: () => Promise<string | null>) {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'GET',
    headers: {
      'ngrok-skip-browser-warning': 'true',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  const user = await response.json();

  return user;
}
