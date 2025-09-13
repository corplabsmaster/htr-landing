"use client";

import { BlockType } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotionRenderer({ blocks }: { blocks: BlockType[] }) {
  const [isLoading, setIsLoading] = useState(true);
  const [processedBlocks, setProcessedBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (!blocks) {
      setIsLoading(false);
      return;
    }

    // Process the blocks with a slight delay to show loading state
    const timer = setTimeout(() => {
      setProcessedBlocks(processListItems(blocks));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [blocks]);

  if (isLoading) {
    return (
      <div className="notion-content space-y-6 animate-pulse">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="space-y-2">
            {i % 4 === 0 && (
              <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
            )}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            {i % 3 === 0 && (
              <div className="h-[200px] bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (!blocks) return null;

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
          className="text-3xl font-bold mt-8 mb-4 text-[#2c5b2d] dark:text-lake-500"
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
          className="text-2xl font-bold mt-6 mb-3 text-[#2c5b2d] dark:text-lake-500"
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
          className="text-xl font-bold mt-5 mb-2 text-[#2c5b2d] dark:text-lake-500"
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
          className="pl-6 py-3 border-l-4 border-[#2c5b2d] dark:border-lake-500 my-6 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg"
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
        <div key={id} className="my-4">
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {block.code.rich_text.map((text: any, i: number) => (
                <span key={i}>{text.plain_text}</span>
              ))}
            </code>
          </pre>
          {block.code.caption?.length > 0 && (
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {block.code.caption[0].plain_text}
            </p>
          )}
        </div>
      );

    case "table":
      return (
        <div key={id} className="my-4 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <tbody>
              {block.table.rows.map((row: any, rowIndex: number) => (
                <tr
                  key={`row-${rowIndex}`}
                  className={
                    rowIndex === 0 && block.table.has_column_header
                      ? "bg-gray-100 dark:bg-gray-800"
                      : rowIndex % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : ""
                  }
                >
                  {row.cells.map((cell: any, cellIndex: number) => {
                    const Tag =
                      rowIndex === 0 && block.table.has_column_header
                        ? "th"
                        : "td";
                    return (
                      <Tag
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                      >
                        {cell.map((text: any, i: number) => (
                          <TextRenderer key={i} text={text} />
                        ))}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "column_list":
      return (
        <div key={id} className="grid md:grid-cols-2 gap-4 my-4">
          {block.children &&
            block.children.map((column: any) => (
              <div key={column.id}>
                {column.children &&
                  column.children.map((block: any) => renderBlock(block))}
              </div>
            ))}
        </div>
      );

    case "callout":
      return (
        <div
          key={id}
          className="flex p-6 my-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-[#2c5b2d] dark:border-lake-500 shadow-sm"
        >
          {block.callout.icon && block.callout.icon.type === "emoji" && (
            <div className="mr-4 text-2xl flex-shrink-0">
              {block.callout.icon.emoji}
            </div>
          )}
          <div className="flex-1">
            {block.callout.rich_text.map((text: any, i: number) => (
              <TextRenderer key={i} text={text} />
            ))}
            {block.has_children && block.children && (
              <div className="mt-2">
                {block.children.map((childBlock: any) =>
                  renderBlock(childBlock)
                )}
              </div>
            )}
          </div>
        </div>
      );

    case "embed":
      return (
        <div key={id} className="my-4">
          <iframe
            src={block.embed.url}
            className="w-full h-64 md:h-96 border-0"
            allowFullScreen
          ></iframe>
          {block.embed.caption?.length > 0 && (
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {block.embed.caption[0].plain_text}
            </p>
          )}
        </div>
      );

    case "bookmark":
      return (
        <a
          key={id}
          href={block.bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 my-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <h4 className="font-medium text-blue-600 dark:text-blue-400">
            {block.bookmark.caption?.length > 0
              ? block.bookmark.caption[0].plain_text
              : block.bookmark.url}
          </h4>
          <p className="text-sm text-gray-500">{block.bookmark.url}</p>
        </a>
      );

    default:
      console.log("Unsupported block type:", type);
      return (
        <div key={id} className="text-red-500">
          Unsupported block type: {type}
        </div>
      );
  }
}

// Helper function to render text with all its annotations
function TextRenderer({ text }: { text: any }) {
  const {
    annotations: { bold, italic, strikethrough, underline, code, color },
    text: { content, link },
  } = text;

  // Apply all the annotations
  let className = "";
  if (bold) className += " font-bold text-[#2c5b2d] dark:text-lake-500";
  if (italic) className += " italic";
  if (strikethrough) className += " line-through";
  if (underline) className += " underline";

  // Apply color
  const textColor =
    color !== "default"
      ? color.includes("_background")
        ? `bg-${color.replace("_background", "")}-100`
        : `text-${color}-600`
      : "";

  // If it's a link
  if (link) {
    return (
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-blue-600 dark:text-blue-400 hover:underline ${className} ${textColor}`}
      >
        {content}
      </Link>
    );
  }

  // If it's code
  if (code) {
    return (
      <code
        className={`px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm ${className} ${textColor}`}
      >
        {content}
      </code>
    );
  }

  // Plain text with annotations
  return <span className={`${className} ${textColor}`}>{content}</span>;
}
