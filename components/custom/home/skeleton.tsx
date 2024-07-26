import React from 'react';

const HomePageSkeleton: React.FC = () => (
  <div className="p-8 min-h-screen bg-[#FBF3D9] animate-pulse">
    <div className="h-16 bg-[#ded4b8] rounded-lg mb-12 mx-auto max-w-md"></div>
    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
      <div className="h-14 bg-[#ded4b8] rounded-full w-48 mx-auto sm:mx-0"></div>
      <div className="h-14 bg-[#ded4b8] rounded-full w-48 mx-auto sm:mx-0"></div>
    </div>
    <div className="h-4 bg-[#ded4b8] rounded w-64 mx-auto mb-24"></div>
    <div className="bg-[#F7F3E8] rounded-2xl shadow-lg p-6 max-w-3xl mx-auto mb-6">
      <div className="h-6 bg-[#ded4b8] rounded w-40 mb-4"></div>
      <div className="space-y-4">
        <div className="h-16 bg-[#ded4b8] rounded-lg"></div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="h-10 bg-[#ded4b8] rounded-full w-40"></div>
      </div>
    </div>
  </div>
);

export default HomePageSkeleton;
