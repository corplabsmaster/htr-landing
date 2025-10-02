"use client";

import Image from "next/image";
import { ReactNode } from "react";

export interface ContentSectionProps {
  headline: string;
  leftContent: string | ReactNode;
  rightContent: string | ReactNode;
  imageLeft?: boolean;
  headlineClassName?: string;
  textClassName?: string;
  imageClassName?: string;
  sectionClassName?: string;
  isFeatureSection?: boolean;
}

export function ContentSection({
  headline,
  leftContent,
  rightContent,
  imageLeft = false,
  headlineClassName = "",
  textClassName = "",
  imageClassName = "",
  sectionClassName = "",
  isFeatureSection = false,
}: ContentSectionProps) {
  // When imageLeft is true, leftContent should be the image and rightContent should be the text
  // When imageLeft is false, leftContent should be the text and rightContent should be the image
  const [textContent, imageContent] = imageLeft
    ? [rightContent, leftContent] // imageLeft: true - text on right, image on left
    : [leftContent, rightContent]; // imageLeft: false - text on left, image on right

  const TextComponent = (
    <div className="flex flex-col justify-center space-y-1 md:space-y-4">
      <h2
        className={`text-xl md:text-3xl font-bold whitespace-pre-line ${headlineClassName}`}
        dangerouslySetInnerHTML={{ __html: headline }}
      />
      <p
        className={`text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed ${textClassName}`}
      >
        {typeof textContent === "string" ? textContent : textContent}
      </p>
    </div>
  );

  const ImageComponent =
    typeof imageContent === "string" ? (
      <div
        className={`relative ${
          isFeatureSection
            ? "h-[600px] md:max-h-[700px] w-auto mask-feature-container"
            : "h-[300px] md:h-[400px] w-full"
        } rounded-xl overflow-hidden ${imageClassName}`}
        style={
          isFeatureSection
            ? {
                maskImage:
                  "linear-gradient(to bottom, black 50%, transparent 94%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, transparent 94%)",
              }
            : undefined
        }
      >
        <Image
          src={imageContent}
          alt={headline}
          fill
          className={`object-contain ${
            isFeatureSection ? "object-top" : "object-cover"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    ) : (
      imageContent
    );

  return (
    <div className={`py-4 md:py-16 px-2 ${sectionClassName}`}>
      {/* Mobile: Always Text above Image */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-4">
          {TextComponent}
          {ImageComponent}
        </div>
      </div>

      {/* Desktop: Respect imageLeft prop */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
        {imageLeft ? (
          <>
            {ImageComponent}
            {TextComponent}
          </>
        ) : (
          <>
            {TextComponent}
            {ImageComponent}
          </>
        )}
      </div>
    </div>
  );
}
