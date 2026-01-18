"use client";

import { useRouter } from "next/navigation";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type Props = {
  showBack?: boolean;
  showForward?: boolean;
};

export default function NavigationButtons({
  showBack = true,
  showForward = true,
}: Props) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
      {showBack ? (
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back
        </button>
      ) : (
        <span />
      )}

      {showForward && (
        <button
          onClick={() => router.forward()}
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-200 bg-white px-3 py-1.5 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Forward
          <FiArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
