"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

/**
 * Custom hook for navigation with loading state
 * @returns Object with navigateWithLoading function and isLoading state
 */
export function useNavigationWithLoading() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isManuallyLoading, setIsManuallyLoading] = useState(false);

  // Combine Next.js transition state with our manual loading state
  const isLoading = isPending || isManuallyLoading;

  /**
   * Navigate to a new page with a loading state
   * @param href URL to navigate to
   * @param options Navigation options including loading delay
   */
  const navigateWithLoading = useCallback(
    (
      href: string,
      options: {
        loadingDelay?: number;
        scroll?: boolean;
        preserveScroll?: boolean;
      } = {}
    ) => {
      const { loadingDelay = 500, scroll = true } = options;

      // Set loading state
      setIsManuallyLoading(true);

      // Optional artificial delay to ensure loading state is visible
      setTimeout(() => {
        startTransition(() => {
          router.push(href, { scroll });

          // Keep loading state a bit longer for visual consistency
          setTimeout(() => {
            setIsManuallyLoading(false);
          }, 300);
        });
      }, loadingDelay);
    },
    [router]
  );

  return { navigateWithLoading, isLoading };
}
