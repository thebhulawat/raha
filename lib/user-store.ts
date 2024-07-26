import { getUser, User } from '@/api/users';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  userDetails: User | null;
  setUserDetails: (details: User | null) => void;
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
  getToken: () => Promise<string | null>
) => {
  try {
    const user = await getUser(getToken);
    useUserStore.getState().setUserDetails(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
};
