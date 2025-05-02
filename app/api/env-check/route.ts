import { NextResponse } from "next/server";

export async function GET() {
  // Don't return the actual values for security reasons
  // Just check if they exist and return a status
  const result = {
    notionApiKey: {
      exists: !!process.env.NOTION_API_KEY,
      firstChar: process.env.NOTION_API_KEY
        ? process.env.NOTION_API_KEY.substring(0, 1)
        : null,
      length: process.env.NOTION_API_KEY
        ? process.env.NOTION_API_KEY.length
        : 0,
    },
    notionDatabaseId: {
      exists: !!process.env.NOTION_DATABASE_ID,
      value: process.env.NOTION_DATABASE_ID
        ? `${process.env.NOTION_DATABASE_ID.substring(
            0,
            4
          )}...${process.env.NOTION_DATABASE_ID.substring(
            process.env.NOTION_DATABASE_ID.length - 4
          )}`
        : null,
      length: process.env.NOTION_DATABASE_ID
        ? process.env.NOTION_DATABASE_ID.length
        : 0,
    },
    nodeEnv: process.env.NODE_ENV,
  };

  return NextResponse.json(result);
}
