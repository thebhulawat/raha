import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDetails {
  clerkId: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  subscriptionStatus: string;
  freeCallsLeft: number;
}

interface UserStore {
  userDetails: UserDetails | null;
  setUserDetails: (details: UserDetails | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userDetails: null,
      setUserDetails: (details) => set({ userDetails: details }),
    }),
    {
      name: 'user',
    }
  )
);

export const fetchUserDetails = async (
  userId: string,
  getToken: () => Promise<string | null>
): Promise<UserDetails> => {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  const data = await response.json();
  useUserStore.getState().setUserDetails(data);
  return data;
};
