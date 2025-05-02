"use client";

import { useEffect, useState } from "react";

export default function LoadingOverlay({
  isLoading,
  minDisplayTime = 500,
}: {
  isLoading: boolean;
  minDisplayTime?: number;
}) {
  // States to manage visibility and transitions
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let errorTimeoutId: NodeJS.Timeout | null = null;

    if (isLoading) {
      // Clear any pending hide operations
      if (timeoutId) clearTimeout(timeoutId);
      if (errorTimeoutId) clearTimeout(errorTimeoutId);

      setIsFadingOut(false);
      setShouldDisplay(true);
      setDisplayError(false);

      // Set an error timeout after 4 seconds
      errorTimeoutId = setTimeout(() => {
        setDisplayError(true);
      }, 4000);
    } else if (shouldDisplay) {
      // Start fade out transition
      setIsFadingOut(true);

      // After the fade duration, actually hide the element
      timeoutId = setTimeout(() => {
        setShouldDisplay(false);
        setIsFadingOut(false);
        setDisplayError(false);
      }, minDisplayTime);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (errorTimeoutId) clearTimeout(errorTimeoutId);
    };
  }, [isLoading, shouldDisplay, minDisplayTime]);

  if (!shouldDisplay) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-950 transition-opacity duration-300 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center animate-fadeIn">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-t-[#2c5b2d] border-r-transparent border-b-[#2c5b2d] border-l-transparent rounded-full animate-spin dark:border-t-[#2ae1ac] dark:border-b-[#2ae1ac]"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-t-transparent border-r-[#2c5b2d] border-b-transparent border-l-[#2c5b2d] rounded-full animate-spinReverse opacity-70 dark:border-r-[#2ae1ac] dark:border-l-[#2ae1ac]"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium mt-6 animate-spinnerPulse">
          Loading content...
        </p>

        {displayError && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-4 max-w-xs text-center">
            Taking longer than expected. If content doesn't load soon, please
            try refreshing the page.
          </p>
        )}
      </div>
    </div>
  );
}
