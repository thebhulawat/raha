'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { fetchUserDetails } from '@/lib/userStore';
import { Loader2 } from 'lucide-react';

export default function PaymentSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { userId, getToken } = useAuth();

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!userId) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const pollInterval = 3000; // 3 seconds between each poll
        const maxAttempts = 3;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
          await new Promise((resolve) => setTimeout(resolve, pollInterval));

          const userDetails = await fetchUserDetails(userId, getToken);

          if (
            userDetails.subscriptionStatus === 'trialing' ||
            userDetails.subscriptionStatus === 'active'
          ) {
            router.push('/home');
            return;
          }
        }

        // If we've reached this point, the subscription status hasn't changed
        setError(
          'We were not able to find/ activate your subscription. This could be due to a payment failure or several other factors.'
        );
      } catch (error) {
        console.error('Error checking subscription status:', error);
        setError('An error occurred. Please try again or contact support.');
      } finally {
        setLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, [userId, getToken, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF3D9]">
        <Loader2 className="w-12 h-12 animate-spin text-[#5D552F]" />
        <p className="mt-4 text-[#5D552F] font-medium">
          Processing your subscription
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FBF3D9] p-4">
        <h1 className="text-2xl font-bold text-[#5D552F] mb-4">
          Could not complete your subscription
        </h1>
        <p className="text-[#5D552F] mb-4 text-lg">{error}</p> <br />
        Please do not worry. If your money has been debited or you are not able
        to upgrade due to any reason, please email us at{' '}
        <a href="mailto:nischalj10@gmail.com" className="underline">
          nischalj10@gmail.com
        </a>
      </div>
    );
  }

  return null; // This should never render as we're either loading, showing an error, or redirecting
}
