import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

interface TestResult {
  success: boolean;
  title?: string;
  error?: string;
}

export async function GET() {
  try {
    // Initialize Notion client
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    // Database IDs
    const blogDatabaseId = process.env.NOTION_DATABASE_ID || "";
    const contactsDatabaseId = process.env.NOTION_CONTACTS_DATABASE_ID || "";

    // Environment check
    if (!process.env.NOTION_API_KEY) {
      return NextResponse.json(
        { error: "NOTION_API_KEY not set" },
        { status: 500 }
      );
    }

    // Test database connections
    const results: {
      apiKeyPresent: boolean;
      blogDatabaseId: string;
      contactsDatabaseId: string;
      blogDatabaseTest: TestResult | null;
      contactsDatabaseTest: TestResult | null;
    } = {
      apiKeyPresent: !!process.env.NOTION_API_KEY,
      blogDatabaseId,
      contactsDatabaseId,
      blogDatabaseTest: null,
      contactsDatabaseTest: null,
    };

    try {
      // Check blog database
      const blogDbResponse = await notion.databases.retrieve({
        database_id: blogDatabaseId,
      });

      // Get database title (might be in different formats)
      let databaseTitle = "Unnamed database";
      const typedResponse = blogDbResponse as any;
      if (
        typedResponse.title &&
        Array.isArray(typedResponse.title) &&
        typedResponse.title.length > 0
      ) {
        databaseTitle = typedResponse.title[0].plain_text || databaseTitle;
      }

      results.blogDatabaseTest = {
        success: true,
        title: databaseTitle,
      };
    } catch (error) {
      results.blogDatabaseTest = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    try {
      // Check contacts database
      const contactsDbResponse = await notion.databases.retrieve({
        database_id: contactsDatabaseId,
      });

      // Get database title (might be in different formats)
      let databaseTitle = "Unnamed database";
      const typedResponse = contactsDbResponse as any;
      if (
        typedResponse.title &&
        Array.isArray(typedResponse.title) &&
        typedResponse.title.length > 0
      ) {
        databaseTitle = typedResponse.title[0].plain_text || databaseTitle;
      }

      results.contactsDatabaseTest = {
        success: true,
        title: databaseTitle,
      };
    } catch (error) {
      results.contactsDatabaseTest = {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to test Notion connection",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
