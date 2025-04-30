import { checkNotionDatabaseSync } from "@/lib/notion";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const syncStatus = await checkNotionDatabaseSync();

    return NextResponse.json(syncStatus);
  } catch (error) {
    console.error("Error in Notion sync API route:", error);
    return NextResponse.json(
      { error: "Failed to check Notion database sync" },
      { status: 500 }
    );
  }
}
