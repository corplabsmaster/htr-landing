"use client";

import Image from "next/image";
import Link from "next/link";

type BlockType = any; // For simplicity, we're using 'any' for Notion block types

export default function NotionRenderer({ blocks }: { blocks: BlockType[] }) {
  if (!blocks) return null;

  // Process lists first
  const processedBlocks = processListItems(blocks);

  return (
    <div className="notion-content space-y-6">
      {processedBlocks.map((block) => renderBlock(block))}
    </div>
  );
}

// Helper function to process list items and group them
function processListItems(blocks: BlockType[]) {
  const processedBlocks: any[] = [];
  let currentListType: string | null = null;
  let currentListItems: any[] = [];

  blocks.forEach((block) => {
    if (
      (block.type === "bulleted_list_item" ||
        block.type === "numbered_list_item") &&
      currentListType === block.type
    ) {
      // Continue the current list
      currentListItems.push(block);
    } else if (
      (block.type === "bulleted_list_item" ||
        block.type === "numbered_list_item") &&
      currentListType !== block.type
    ) {
      // End previous list if there was one
      if (currentListItems.length > 0) {
        processedBlocks.push({
          id: `list-${currentListItems[0].id}`,
          type:
            currentListType === "bulleted_list_item"
              ? "bulleted_list"
              : "numbered_list",
          listItems: currentListItems,
        });
        currentListItems = [];
      }

      // Start a new list
      currentListType = block.type;
      currentListItems.push(block);
    } else {
      // Not a list item, end any current list
      if (currentListItems.length > 0) {
        processedBlocks.push({
          id: `list-${currentListItems[0].id}`,
          type:
            currentListType === "bulleted_list_item"
              ? "bulleted_list"
              : "numbered_list",
          listItems: currentListItems,
        });
        currentListItems = [];
        currentListType = null;
      }

      // Add the non-list block
      processedBlocks.push(block);
    }
  });

  // Add any remaining list items
  if (currentListItems.length > 0) {
    processedBlocks.push({
      id: `list-${currentListItems[0].id}`,
      type:
        currentListType === "bulleted_list_item"
          ? "bulleted_list"
          : "numbered_list",
      listItems: currentListItems,
    });
  }

  return processedBlocks;
}

// Recursive function to render a block
function renderBlock(block: any) {
  const { id, type } = block;

  // Check if it's one of our custom processed blocks
  if (type === "bulleted_list") {
    return (
      <ul key={id} className="list-disc pl-6 space-y-2">
        {block.listItems.map((item: any) => (
          <li key={item.id} className="text-gray-800 dark:text-gray-200">
            {item.bulleted_list_item.rich_text.map((text: any, i: number) => (
              <TextRenderer key={i} text={text} />
            ))}

            {/* Check for child blocks */}
            {item.has_children && item.children && (
              <div className="mt-2">
                {item.children.map((childBlock: any) =>
                  renderBlock(childBlock)
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (type === "numbered_list") {
    return (
      <ol key={id} className="list-decimal pl-6 space-y-2">
        {block.listItems.map((item: any) => (
          <li key={item.id} className="text-gray-800 dark:text-gray-200">
            {item.numbered_list_item.rich_text.map((text: any, i: number) => (
              <TextRenderer key={i} text={text} />
            ))}

            {/* Check for child blocks */}
            {item.has_children && item.children && (
              <div className="mt-2">
                {item.children.map((childBlock: any) =>
                  renderBlock(childBlock)
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    );
  }

  // Process the different block types
  switch (type) {
    case "paragraph":
      return (
        <p key={id} className="text-gray-800 dark:text-gray-200">
          {block.paragraph.rich_text.map((text: any, i: number) => (
            <TextRenderer key={i} text={text} />
          ))}

          {/* Check for child blocks */}
          {block.has_children && block.children && (
            <div className="mt-2">
              {block.children.map((childBlock: any) => renderBlock(childBlock))}
            </div>
          )}
        </p>
      );

    case "heading_1":
      return (
        <h1
          key={id}
          className="text-3xl font-bold mt-8 mb-4 text-[#2c5b2d] dark:text-[#2ae1ac]"
        >
          {block.heading_1.rich_text.map((text: any, i: number) => (
            <TextRenderer key={i} text={text} />
          ))}
        </h1>
      );

    case "heading_2":
      return (
        <h2
          key={id}
          className="text-2xl font-bold mt-6 mb-3 text-[#2c5b2d] dark:text-[#2ae1ac]"
        >
          {block.heading_2.rich_text.map((text: any, i: number) => (
            <TextRenderer key={i} text={text} />
          ))}
        </h2>
      );

    case "heading_3":
      return (
        <h3
          key={id}
          className="text-xl font-bold mt-5 mb-2 text-[#2c5b2d] dark:text-[#2ae1ac]"
        >
          {block.heading_3.rich_text.map((text: any, i: number) => (
            <TextRenderer key={i} text={text} />
          ))}
        </h3>
      );

    case "bulleted_list_item":
    case "numbered_list_item":
      // These should be handled by the list processor
      return null;

    case "image":
      const imageUrl =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption =
        block.image.caption?.length > 0
          ? block.image.caption[0].plain_text
          : "";

      return (
        <figure key={id} className="my-8">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={caption || "Blog image"}
              fill
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    case "divider":
      return (
        <hr key={id} className="my-6 border-gray-200 dark:border-gray-700" />
      );

    case "quote":
      return (
        <blockquote
          key={id}
          className="pl-4 border-l-4 border-[#2c5b2d] dark:border-[#2ae1ac] my-4 italic text-gray-700 dark:text-gray-300"
        >
          {block.quote.rich_text.map((text: any, i: number) => (
            <TextRenderer key={i} text={text} />
          ))}

          {/* Check for child blocks */}
          {block.has_children && block.children && (
            <div className="mt-2">
              {block.children.map((childBlock: any) => renderBlock(childBlock))}
            </div>
          )}
        </blockquote>
      );

    case "code":
      return (
        <pre
          key={id}
          className="p-4 rounded-lg bg-gray-800 text-gray-200 overflow-x-auto my-4 text-sm"
        >
          <code>
            {block.code.rich_text.map((text: any, i: number) => (
              <span key={i}>{text.plain_text}</span>
            ))}
          </code>
        </pre>
      );

    case "column_list":
      return (
        <div key={id} className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          {block.children?.map((column: any) => renderBlock(column))}
        </div>
      );

    case "column":
      return (
        <div key={id} className="flex flex-col space-y-4">
          {block.children?.map((childBlock: any) => renderBlock(childBlock))}
        </div>
      );

    default:
      // For debugging
      console.log(`Unsupported block type: ${type}`, block);
      return (
        <div key={id} className="text-sm text-gray-500 dark:text-gray-400">
          Unsupported block type: {type}
        </div>
      );
  }
}

function TextRenderer({ text }: { text: any }) {
  if (!text || !text.plain_text) return null;

  let content = <>{text.plain_text}</>;

  if (text.annotations.bold) {
    content = <strong>{content}</strong>;
  }

  if (text.annotations.italic) {
    content = <em>{content}</em>;
  }

  if (text.annotations.strikethrough) {
    content = <s>{content}</s>;
  }

  if (text.annotations.underline) {
    content = <u>{content}</u>;
  }

  if (text.annotations.code) {
    content = (
      <code className="px-1 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 text-sm">
        {content}
      </code>
    );
  }

  if (text.href) {
    content = (
      <Link
        href={text.href}
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        {content}
      </Link>
    );
  }

  return content;
}
