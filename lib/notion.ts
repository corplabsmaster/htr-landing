import { Client } from "@notionhq/client";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Your Notion database ID (replace with your actual database ID)
const databaseId = process.env.NOTION_DATABASE_ID || "";

// Debug log
console.log("Notion setup with database ID:", databaseId);

// Define the post statuses
const POST_STATUS = {
  PUBLISHED: "published",
  DRAFT: "draft",
  IN_REVIEW: "in review",
};

// Create a stable ID from Notion page ID that's consistent across refreshes
function createStableId(pageId: string): string {
  // Remove dashes and use the last 12 characters for a more compact ID
  return pageId.replace(/-/g, "").slice(-12);
}

// Cache structure to store database property metadata
interface DatabaseStructure {
  properties: Record<string, { id: string; type: string; name: string }>;
  lastUpdated: number;
}

// Cache for database structure to avoid redundant fetches
let databaseStructureCache: DatabaseStructure | null = null;
const DB_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Function to get database structure and property IDs
async function getDatabaseStructure(): Promise<DatabaseStructure | null> {
  try {
    const now = Date.now();

    // Use cache if valid
    if (
      databaseStructureCache &&
      now - databaseStructureCache.lastUpdated < DB_CACHE_DURATION
    ) {
      return databaseStructureCache;
    }

    console.log("Fetching database structure from Notion...");
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Create a simplified structure with property metadata
    const properties: Record<
      string,
      { id: string; type: string; name: string }
    > = {};

    for (const [propName, propValue] of Object.entries(response.properties)) {
      // @ts-ignore
      const propType = propValue.type;
      // @ts-ignore
      const propId = propValue.id;

      properties[propName] = {
        id: propId,
        type: propType,
        name: propName,
      };
    }

    // Update cache
    databaseStructureCache = {
      properties,
      lastUpdated: now,
    };

    console.log(`Cached ${Object.keys(properties).length} database properties`);
    return databaseStructureCache;
  } catch (error) {
    console.error("Error fetching database structure:", error);
    return null;
  }
}

export async function getBlogPosts() {
  try {
    console.log("Fetching blog posts from Notion...");

    // Get database structure for property IDs
    const dbStructure = await getDatabaseStructure();

    // First, let's get the database properties we need
    let statusPropertyType = null;
    let statusPropertyName = "Status"; // Default name, will be updated if we find it
    let statusPropertyId = null;
    let datePropertyName = "Created time"; // Default to created time which always exists
    let datePropertyId = null;

    if (dbStructure) {
      console.log("Using cached database structure");

      // Look for date properties we can sort by
      for (const [propName, propMeta] of Object.entries(
        dbStructure.properties
      )) {
        const propType = propMeta.type;

        // Check for common date property names
        if (
          propType === "date" ||
          propType === "created_time" ||
          propType === "last_edited_time"
        ) {
          // Prioritize properties that are likely publication dates
          if (
            propName.toLowerCase().includes("publish") ||
            propName.toLowerCase().includes("date") ||
            propName.toLowerCase() === "published"
          ) {
            datePropertyName = propName;
            datePropertyId = propMeta.id;
            console.log(
              `Found date property for sorting: ${datePropertyName} (ID: ${datePropertyId})`
            );
            break;
          }

          // Keep track of any date property as a fallback
          if (datePropertyName === "Created time") {
            datePropertyName = propName;
            datePropertyId = propMeta.id;
          }
        }
      }

      // Check for Status property (could be named differently)
      for (const [propName, propMeta] of Object.entries(
        dbStructure.properties
      )) {
        // Check for common status property names
        if (
          propName.toLowerCase() === "status" ||
          propName.toLowerCase() === "state" ||
          propName.toLowerCase() === "published status"
        ) {
          statusPropertyName = propName;
          statusPropertyType = propMeta.type;
          statusPropertyId = propMeta.id;
          console.log(
            `Found status property: ${statusPropertyName} (ID: ${statusPropertyId}) with type: ${statusPropertyType}`
          );
          break;
        }
      }
    } else {
      console.log("Database structure not available, using property names");
      // Fallback to the original method of searching by name
      try {
        const database = await notion.databases.retrieve({
          database_id: databaseId,
        });
        console.log("Database properties:", Object.keys(database.properties));

        // Look for date properties we can sort by
        for (const [propName, propValue] of Object.entries(
          database.properties
        )) {
          // @ts-ignore
          const propType = propValue.type;
          // @ts-ignore
          const propId = propValue.id;

          // Check for common date property names
          if (
            propType === "date" ||
            propType === "created_time" ||
            propType === "last_edited_time"
          ) {
            // Prioritize properties that are likely publication dates
            if (
              propName.toLowerCase().includes("publish") ||
              propName.toLowerCase().includes("date") ||
              propName.toLowerCase() === "published"
            ) {
              datePropertyName = propName;
              datePropertyId = propId;
              console.log(
                `Found date property for sorting: ${datePropertyName} (ID: ${datePropertyId})`
              );
              break;
            }

            // Keep track of any date property as a fallback
            if (datePropertyName === "Created time") {
              datePropertyName = propName;
              datePropertyId = propId;
            }
          }
        }

        // Check for Status property (could be named differently)
        for (const [propName, propValue] of Object.entries(
          database.properties
        )) {
          // Check for common status property names
          if (
            propName.toLowerCase() === "status" ||
            propName.toLowerCase() === "state" ||
            propName.toLowerCase() === "published status"
          ) {
            statusPropertyName = propName;
            // @ts-ignore
            statusPropertyType = propValue.type;
            // @ts-ignore
            statusPropertyId = propValue.id;
            console.log(
              `Found status property: ${statusPropertyName} (ID: ${statusPropertyId}) with type: ${statusPropertyType}`
            );
            break;
          }
        }
      } catch (error) {
        console.error("Error retrieving database structure:", error);
      }
    }

    // Build the query based on what we found
    const queryOptions: any = {
      database_id: databaseId,
      sorts: [
        {
          property: datePropertyName,
          direction: "descending",
        },
      ],
      // Optimized: Only fetch the properties we need to reduce data transfer
      page_size: 100, // Limit to 100 posts at most
    };

    // If we're sorting by a system property rather than a user-defined one
    if (datePropertyName === "Created time") {
      queryOptions.sorts = [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ];
    } else if (datePropertyName === "Last edited time") {
      queryOptions.sorts = [
        {
          timestamp: "last_edited_time",
          direction: "descending",
        },
      ];
    }

    console.log(`Sorting blog posts by: ${datePropertyName}`);

    // Add filter for published posts if we found a Status property
    if (statusPropertyType) {
      // Different filter depending on property type
      if (statusPropertyType === "select") {
        queryOptions.filter = {
          property: statusPropertyName,
          select: {
            equals: POST_STATUS.PUBLISHED,
          },
        };
      } else if (statusPropertyType === "status") {
        queryOptions.filter = {
          property: statusPropertyName,
          status: {
            equals: POST_STATUS.PUBLISHED,
          },
        };
      } else if (statusPropertyType === "checkbox") {
        queryOptions.filter = {
          property: statusPropertyName,
          checkbox: {
            equals: true,
          },
        };
      } else if (statusPropertyType === "rich_text") {
        queryOptions.filter = {
          property: statusPropertyName,
          rich_text: {
            equals: POST_STATUS.PUBLISHED,
          },
        };
      }

      console.log(
        `Applied filter for status (${statusPropertyType}):`,
        queryOptions.filter
      );
    } else {
      console.log("No status property found, will return all posts");
    }

    // Now query the posts
    const response = await notion.databases.query(queryOptions);

    console.log(`Fetched ${response.results.length} blog posts from Notion`);

    // Process the results
    const postsPromises = response.results.map(async (page: any) => {
      try {
        // Create a stable, deterministic ID for caching
        const stableId = createStableId(page.id);
        const notionId = page.id; // Keep original Notion ID for reference

        // Make these more resilient with safer property access
        const title =
          page.properties?.Title?.title?.[0]?.plain_text || "Untitled";

        // Get published date using our helper
        const published = extractPublishedDate(page);

        const slug =
          page.properties?.Slug?.rich_text?.[0]?.plain_text || stableId;
        const excerpt =
          page.properties?.Excerpt?.rich_text?.[0]?.plain_text || "";
        const seoTitle =
          page.properties?.["SEO Title"]?.rich_text?.[0]?.plain_text || title;
        const metaDescription =
          page.properties?.["Meta Description"]?.rich_text?.[0]?.plain_text ||
          excerpt;

        // Get author information - optimize to avoid unnecessary fetches
        const authorData = await extractAuthorInfo(page);
        const { authorName, authorImage = "", authorRole = "" } = authorData;

        // Banner image can be in file or external format
        const bannerImage =
          page.properties?.["Blog Banner"]?.files?.[0]?.file?.url ||
          page.properties?.["Blog Banner"]?.files?.[0]?.external?.url ||
          "";

        // Process categories with original Notion IDs
        const categories =
          page.properties?.Categories?.multi_select?.map((cat: any) => ({
            id: cat.id, // Preserve Notion's original category ID
            notionId: cat.id, // Add explicit notionId for clarity
            name: cat.name,
            color: cat.color,
          })) || [];

        // Check status manually as a fallback
        let status = null;
        if (statusPropertyName && page.properties?.[statusPropertyName]) {
          const prop = page.properties[statusPropertyName];
          if (prop.type === "select" && prop.select) {
            status = prop.select.name?.toLowerCase();
          } else if (prop.type === "status" && prop.status) {
            status = prop.status.name?.toLowerCase();
          } else if (prop.type === "checkbox") {
            status = prop.checkbox ? POST_STATUS.PUBLISHED : POST_STATUS.DRAFT;
          } else if (prop.type === "rich_text" && prop.rich_text?.[0]) {
            status = prop.rich_text[0].plain_text?.toLowerCase();
          }
        }

        // Skip posts that aren't published (additional safety check)
        if (status && status !== POST_STATUS.PUBLISHED) {
          console.log(`Skipping post "${title}" with status: ${status}`);
          return null;
        }

        return {
          id: stableId, // Using our more stable, deterministic ID
          notionId, // Store the original Notion ID for reference/debugging
          title,
          seoTitle,
          metaDescription,
          published,
          slug,
          excerpt,
          bannerImage,
          authorName,
          authorImage,
          authorRole,
          categories,
          status,
          // Add property IDs for reference if needed in the UI
          propertyIds: {
            title: page.properties?.Title?.id,
            slug: page.properties?.Slug?.id,
            excerpt: page.properties?.Excerpt?.id,
            seoTitle: page.properties?.["SEO Title"]?.id,
            metaDescription: page.properties?.["Meta Description"]?.id,
            bannerImage: page.properties?.["Blog Banner"]?.id,
            categories: page.properties?.Categories?.id,
            status: statusPropertyId,
          },
        };
      } catch (error) {
        console.error("Error processing page:", page.id, error);
        // Return a minimal valid object if we can't process a page properly
        return {
          id: createStableId(page.id),
          notionId: page.id,
          title: "Error processing page",
          seoTitle: "Error processing page",
          metaDescription: "",
          published: extractPublishedDate(page) || "",
          slug: page.id,
          excerpt: "",
          bannerImage: "",
          authorName: "",
          authorImage: "",
          authorRole: "",
          categories: [],
          status: null,
        };
      }
    });

    // Process all posts in parallel and filter out any null results
    const posts = (await Promise.all(postsPromises)).filter(
      (post) => post !== null
    );

    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Function to recursively fetch all children of a block
export async function fetchBlockChildren(blockId: string) {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
    });

    const children = response.results;

    // For blocks that might have nested children (columns, etc.)
    for (let i = 0; i < children.length; i++) {
      const block = children[i] as any;

      // Check if the block has children
      if (block.has_children) {
        // Recursively fetch the children
        block.children = await fetchBlockChildren(block.id);
      }
    }

    return children;
  } catch (error) {
    console.error(`Error fetching children of block ${blockId}:`, error);
    return [];
  }
}

// Inside the getBlogPostBySlug function, update the fetchContent part:
async function fetchContent(pageId: string) {
  try {
    const blocks = await fetchBlockChildren(pageId);

    return blocks;
  } catch (error) {
    console.error(`Error fetching content for page ${pageId}:`, error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    console.log(`Fetching blog post with slug: ${slug}`);

    // First, let's get the database structure to understand its properties
    let statusPropertyType = null;
    let statusPropertyName = "Status"; // Default name, will be updated if we find it

    try {
      const database = await notion.databases.retrieve({
        database_id: databaseId,
      });

      // Check for Status property (could be named differently)
      for (const [propName, propValue] of Object.entries(database.properties)) {
        // Check for common status property names
        if (
          propName.toLowerCase() === "status" ||
          propName.toLowerCase() === "state" ||
          propName.toLowerCase() === "published status"
        ) {
          statusPropertyName = propName;
          // @ts-ignore
          statusPropertyType = propValue.type;
          console.log(
            `Found status property: ${statusPropertyName} with type: ${statusPropertyType}`
          );
          break;
        }
      }
    } catch (error) {
      console.error("Error retrieving database structure:", error);
    }

    // First, find the page ID by slug
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      console.log(`No post found with slug: ${slug}`);
      return null;
    }

    // Cast the page to any to access properties
    const page = response.results[0] as any;
    console.log(`Found post with ID: ${page.id}`);

    // Get author information using our enhanced function
    const { authorName, authorImage, authorRole } = await extractAuthorInfo(
      page
    );

    // Get published date
    const published = extractPublishedDate(page);

    // Get page content using our helper function
    const blocks = await fetchContent(page.id);

    try {
      // Process the page data
      const title =
        page.properties?.Title?.title?.[0]?.plain_text || "Untitled";
      const excerpt =
        page.properties?.Excerpt?.rich_text?.[0]?.plain_text || "";
      const seoTitle =
        page.properties?.["SEO Title"]?.rich_text?.[0]?.plain_text || title;
      const metaDescription =
        page.properties?.["Meta Description"]?.rich_text?.[0]?.plain_text ||
        excerpt;

      // Banner image can be in file or external format
      const bannerImage =
        page.properties?.["Blog Banner"]?.files?.[0]?.file?.url ||
        page.properties?.["Blog Banner"]?.files?.[0]?.external?.url ||
        "";

      // Categories are usually multi_select
      const categories =
        page.properties?.Categories?.multi_select?.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          color: cat.color,
        })) || [];

      // Check status manually as a fallback
      let status = null;
      if (statusPropertyName && page.properties?.[statusPropertyName]) {
        const prop = page.properties[statusPropertyName];
        if (prop.type === "select" && prop.select) {
          status = prop.select.name?.toLowerCase();
        } else if (prop.type === "status" && prop.status) {
          status = prop.status.name?.toLowerCase();
        } else if (prop.type === "checkbox") {
          status = prop.checkbox ? "published" : "draft";
        } else if (prop.type === "rich_text" && prop.rich_text?.[0]) {
          status = prop.rich_text[0].plain_text?.toLowerCase();
        }
      }

      return {
        id: page.id,
        title,
        seoTitle,
        metaDescription,
        published,
        slug,
        excerpt,
        bannerImage,
        authorName,
        authorImage,
        authorRole,
        categories,
        status,
        content: blocks,
      };
    } catch (error) {
      console.error("Error processing page data:", error);
      return {
        id: page.id,
        title: "Error processing page",
        seoTitle: "Error",
        metaDescription: "",
        published,
        slug,
        excerpt: "",
        bannerImage: "",
        authorName,
        authorImage,
        authorRole,
        categories: [],
        status: null,
        content: blocks,
      };
    }
  } catch (error) {
    console.error(`Error fetching blog post by slug ${slug}:`, error);
    return null;
  }
}

// Cache for categories to avoid redundant fetches
let categoriesCache: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getCategories() {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (categoriesCache !== null && now - cacheTimestamp < CACHE_DURATION) {
      console.log("Using cached categories data");
      return categoriesCache;
    }

    console.log("Fetching categories from Notion database structure...");

    // Try to use the database structure cache first if available
    const dbStructure = await getDatabaseStructure();
    if (dbStructure) {
      // Look for Categories property
      const categoryProp = Object.entries(dbStructure.properties).find(
        ([name, meta]) =>
          name.toLowerCase() === "categories" && meta.type === "multi_select"
      );

      if (categoryProp) {
        const [propName, propMeta] = categoryProp;

        // Direct fetch of the database to get the multi-select options
        const database = await notion.databases.retrieve({
          database_id: databaseId,
        });

        // Cast to any to bypass type checking for the multi_select property
        const databaseAny = database as any;
        const options =
          databaseAny.properties[propName]?.multi_select?.options || [];

        console.log(`Found ${options.length} categories`);

        // Map only the fields we need
        const categories = options.map((option: any) => ({
          id: option.id,
          notionId: option.id,
          name: option.name,
          color: option.color,
        }));

        // Update cache
        categoriesCache = categories;
        cacheTimestamp = now;

        return categories;
      }
    }

    // Fallback to direct database retrieval if structure cache not available
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Cast to any for easier property access
    const database = response as any;

    let categories = [];
    if (
      database.properties?.Categories?.type === "multi_select" &&
      Array.isArray(database.properties.Categories.multi_select.options)
    ) {
      console.log(
        `Found ${database.properties.Categories.multi_select.options.length} categories`
      );

      // Map only the fields we need
      categories = database.properties.Categories.multi_select.options.map(
        (option: any) => ({
          id: option.id,
          notionId: option.id, // Store the original Notion ID for reference
          name: option.name,
          color: option.color,
        })
      );

      // Update cache
      categoriesCache = categories;
      cacheTimestamp = now;

      return categories;
    } else {
      console.log("Categories property not found or not a multi_select type");
      // Cache empty result too to avoid repeated failed lookups
      categoriesCache = [];
      cacheTimestamp = now;
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories from Notion:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return [];
  }
}

// Enhanced function to extract author information from various property types
async function extractAuthorInfo(page: any) {
  let authorName = "";
  let authorImage = "";
  let authorRole = "";

  try {
    // Check for Writer property first
    if (page.properties?.Writer) {
      const writerProp = page.properties.Writer;

      switch (writerProp.type) {
        case "rich_text":
          if (writerProp.rich_text?.[0]) {
            authorName = writerProp.rich_text[0].plain_text;
          }
          break;

        case "title":
          if (writerProp.title?.[0]) {
            authorName = writerProp.title[0].plain_text;
          }
          break;

        case "people":
          if (writerProp.people?.[0]) {
            const person = writerProp.people[0];
            authorName = person.name || "";
            authorImage = person.avatar_url || "";
          }
          break;

        case "relation":
          if (writerProp.relation?.[0]) {
            const relationId = writerProp.relation[0].id;
            try {
              // Try to fetch the related page
              const relatedPage = await notion.pages.retrieve({
                page_id: relationId,
              });
              const typedPage = relatedPage as any;

              // Look for a name property - could be in different fields
              for (const propName of Object.keys(typedPage.properties || {})) {
                const prop = typedPage.properties[propName];

                // Name could be in title or rich_text property
                if (prop.type === "title" && prop.title?.[0]) {
                  authorName = prop.title[0].plain_text;
                  break;
                } else if (
                  prop.type === "rich_text" &&
                  prop.rich_text?.[0] &&
                  (propName.toLowerCase().includes("name") ||
                    propName.toLowerCase().includes("writer"))
                ) {
                  authorName = prop.rich_text[0].plain_text;
                  break;
                }
              }
            } catch (e) {
              console.error("Error fetching related writer page:", e);
            }
          }
          break;

        case "created_by":
          if (writerProp.created_by) {
            authorName = writerProp.created_by.name || "";
          }
          break;

        case "last_edited_by":
          if (writerProp.last_edited_by) {
            authorName = writerProp.last_edited_by.name || "";
          }
          break;
      }
    }
    // If no Writer property or no author name was found, check Author as fallback
    else if (page.properties?.Author) {
      const authorProp = page.properties.Author;

      switch (authorProp.type) {
        case "rich_text":
          if (authorProp.rich_text?.[0]) {
            authorName = authorProp.rich_text[0].plain_text;
          }
          break;

        case "title":
          if (authorProp.title?.[0]) {
            authorName = authorProp.title[0].plain_text;
          }
          break;

        case "people":
          if (authorProp.people?.[0]) {
            const person = authorProp.people[0];
            authorName = person.name || "";
            authorImage = person.avatar_url || "";
          }
          break;

        case "relation":
          if (authorProp.relation?.[0]) {
            const relationId = authorProp.relation[0].id;
            try {
              const relatedPage = await notion.pages.retrieve({
                page_id: relationId,
              });
              const typedPage = relatedPage as any;

              for (const propName of Object.keys(typedPage.properties || {})) {
                const prop = typedPage.properties[propName];

                if (prop.type === "title" && prop.title?.[0]) {
                  authorName = prop.title[0].plain_text;
                  break;
                } else if (
                  prop.type === "rich_text" &&
                  prop.rich_text?.[0] &&
                  (propName.toLowerCase().includes("name") ||
                    propName.toLowerCase().includes("author"))
                ) {
                  authorName = prop.rich_text[0].plain_text;
                  break;
                }
              }
            } catch (e) {
              console.error("Error fetching related author page:", e);
            }
          }
          break;

        case "created_by":
          if (authorProp.created_by) {
            authorName = authorProp.created_by.name || "";
          }
          break;

        case "last_edited_by":
          if (authorProp.last_edited_by) {
            authorName = authorProp.last_edited_by.name || "";
          }
          break;
      }
    }
    // Fallback to creator information if still no author name
    else if (page.created_by?.name) {
      authorName = page.created_by.name;
      authorImage = page.created_by.avatar_url || "";
    }

    // Check for Role property
    if (page.properties?.Role) {
      const roleProp = page.properties.Role;

      if (roleProp.type === "rich_text" && roleProp.rich_text?.[0]) {
        authorRole = roleProp.rich_text[0].plain_text;
      } else if (roleProp.type === "select" && roleProp.select?.name) {
        authorRole = roleProp.select.name;
      }
    }

    // Set a default author name if none was found
    if (!authorName) {
      authorName = "HiTerra Team";
    }
  } catch (error) {
    console.error("Error processing author information:", error);
    // Set default values in case of error
    authorName = "HiTerra Team";
    authorRole = "Admin";
  }

  return { authorName, authorImage, authorRole };
}

// Helper function to extract and format published date
function extractPublishedDate(page: any): string | null {
  try {
    // Check for various possible property names for published date
    const possibleDateProps = [
      "Published",
      "Date",
      "Publish Date",
      "Published Date",
      "Release Date",
    ];

    let publishedDate = null;

    // Look for date in known properties
    for (const propName of possibleDateProps) {
      if (page.properties?.[propName]?.date?.start) {
        publishedDate = page.properties[propName].date.start;
        console.log(
          `Found published date in '${propName}' property: ${publishedDate}`
        );
        break;
      }
    }

    // Fallback to creation date if no published date is found
    if (!publishedDate && page.created_time) {
      publishedDate = page.created_time;
      console.log(
        `No published date found, using creation date: ${publishedDate}`
      );
    }

    return publishedDate;
  } catch (error) {
    console.error("Error extracting published date:", error);
    return null;
  }
}

/**
 * Checks if the local application is in sync with the Notion database schema
 * Returns an object with information about any differences found
 */
export async function checkNotionDatabaseSync() {
  try {
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    // Get all properties from the database
    const databaseProperties = database.properties;
    console.log(
      "Current database properties:",
      Object.keys(databaseProperties)
    );

    // Define the expected properties for your blog posts
    const expectedProperties = [
      "Title",
      "Slug",
      "Published",
      "Excerpt",
      "SEO Title",
      "Meta Description",
      "Blog Banner",
      "Categories",
      "Author",
      "Status",
    ];

    // Check for missing properties
    const missingProperties = expectedProperties.filter(
      (prop) =>
        !Object.keys(databaseProperties).some(
          (dbProp) => dbProp.toLowerCase() === prop.toLowerCase()
        )
    );

    // Check for new properties that weren't expected
    const newProperties = Object.keys(databaseProperties).filter(
      (dbProp) =>
        !expectedProperties.some(
          (prop) => prop.toLowerCase() === dbProp.toLowerCase()
        )
    );

    // Get property types for all current properties
    const propertyTypes = {};
    for (const [propName, propValue] of Object.entries(databaseProperties)) {
      // @ts-ignore
      propertyTypes[propName] = propValue.type;
    }

    return {
      isSynced: missingProperties.length === 0,
      databaseId,
      // Skip database title due to type changes in Notion API
      missingProperties,
      newProperties,
      propertyTypes,
      allProperties: Object.keys(databaseProperties),
    };
  } catch (error) {
    console.error("Error checking Notion database sync:", error);
    return {
      isSynced: false,
      error: error instanceof Error ? error.message : "Unknown error",
      databaseId,
    };
  }
}
