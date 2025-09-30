import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Notion database ID for newsletter signups - use a separate env var if available
// Otherwise fallback to the hardcoded ID
const databaseId =
  process.env.NOTION_CONTACTS_DATABASE_ID || "1e71810104b580c686efceb3d4ac8bee";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, page } = body;

    console.log("API received request:", { email });
    console.log("Environment variables:", {
      apiKey: process.env.NOTION_API_KEY ? "Set (hidden)" : "Not set",
      databaseId,
    });

    if (!email || !email.includes("@")) {
      console.log("Invalid email format");
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if we have the necessary environment variables
    if (!process.env.NOTION_API_KEY) {
      console.error("NOTION_API_KEY is not set");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    console.log(
      `Adding email ${email} to Notion contacts database ${databaseId}`
    );

    try {
      // Using the updated property names from the Notion database
      // "title" (previously "Contact Name") (type: title)
      // "email" (now type: text instead of email)
      // "Inquiry" (type: multi select)
      const response = await notion.pages.create({
        parent: {
          database_id: databaseId,
        },
        properties: {
          // Title property (main property of the database)
          Title: {
            title: [
              {
                text: {
                  content: `Landing Page Signup`,
                },
              },
            ],
          },
          // Email is now a text property
          Email: {
            rich_text: [
              {
                text: {
                  content: email,
                },
              },
            ],
          },
          Inquiry: {
            multi_select: [
              {
                name: page === "coming-soon" ? "Page Coming Soon" : "App Demo",
              },
            ],
          },
        },
      });

      console.log(
        "Successfully added email to Notion contacts database, response ID:",
        response.id
      );

      return NextResponse.json({
        success: true,
        message: "Email registered successfully",
        id: response.id,
      });
    } catch (notionError) {
      console.error("Notion API error:", notionError);
      if (notionError instanceof Error) {
        // Log more details about the Notion error
        console.error("Notion error details:", {
          message: notionError.message,
          name: notionError.name,
          stack: notionError.stack,
        });

        // Return a more specific error message
        return NextResponse.json(
          {
            error: "Failed to register email in database",
            details: notionError.message,
          },
          { status: 500 }
        );
      }
      throw notionError; // Re-throw to be caught by the outer catch
    }
  } catch (error) {
    console.error("Error adding email to Notion:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to register email" },
      { status: 500 }
    );
  }
}
