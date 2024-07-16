"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/app/onboarding/_actions";
import OnboardingPopup from "@/app/ui/onboarding-popup";
import { lusitana } from "@/app/ui/fonts";

export default function OnboardingPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleClose = async (): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("onboardingComplete", "true");
      
      const res = await completeOnboarding(formData);
      
      if (res?.message) {
        await user?.reload();
        setIsOpen(false);
        router.push("/");
      } else if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      console.error("Error completing onboarding:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={`${lusitana.className} min-h-screen bg-[#FBF3D9] text-2xl`}>
      <OnboardingPopup 
        isOpen={isOpen} 
        onClose={handleClose}
      />
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}