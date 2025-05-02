"use client";

import LoadingOverlay from "@/app/components/ui/loading-overlay";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Create context for loading state
interface LoadingContextType {
  startLoading: () => void;
  stopLoading: () => void;
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Timeout limit (in milliseconds) to prevent infinite loading
const MAX_LOADING_TIME = 5000;

// Custom hook to use the loading context
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

// Loading provider component
export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing timeout to prevent memory leaks
  const clearLoadingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // Automatically stop loading after MAX_LOADING_TIME to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      clearLoadingTimeout();

      timeoutRef.current = setTimeout(() => {
        console.warn(
          `Loading state automatically terminated after ${MAX_LOADING_TIME}ms to prevent infinite loading`
        );
        setIsLoading(false);
      }, MAX_LOADING_TIME);
    }

    return clearLoadingTimeout;
  }, [isLoading]);

  // Clean up on unmount
  useEffect(() => {
    return clearLoadingTimeout;
  }, []);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    clearLoadingTimeout();
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading }}>
      <LoadingOverlay isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
}
