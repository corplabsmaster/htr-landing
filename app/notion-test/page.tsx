"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function NotionTestPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [signupResult, setSignupResult] = useState<any>(null);

  const fetchTestResults = async () => {
    setTestLoading(true);
    try {
      const response = await fetch("/api/notion-test");
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error("Error fetching test:", error);
      setTestResults({ error: "Failed to fetch test results" });
    } finally {
      setTestLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSignupResult(null);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setSignupResult({
        status: response.status,
        ok: response.ok,
        data,
      });
    } catch (error) {
      console.error("Error signing up:", error);
      setSignupResult({ error: "Failed to sign up" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Notion API Test</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Notion Connection</h2>
        <Button onClick={fetchTestResults} disabled={testLoading}>
          {testLoading ? "Testing..." : "Test Connection"}
        </Button>

        {testResults && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Test Results:</h3>
            <pre className="whitespace-pre-wrap overflow-auto max-h-96 text-sm">
              {JSON.stringify(testResults, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Signup Form</h2>
        <form onSubmit={handleSignup} className="flex gap-4 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>

        {signupResult && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Signup Result:</h3>
            <pre className="whitespace-pre-wrap overflow-auto max-h-96 text-sm">
              {JSON.stringify(signupResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="mt-8">
        <a
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
