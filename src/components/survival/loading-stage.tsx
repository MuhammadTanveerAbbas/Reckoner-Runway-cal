'use client';

export function LoadingStage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#00B4FF] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-white">Analyzing your data…</p>
    </div>
  );
}
