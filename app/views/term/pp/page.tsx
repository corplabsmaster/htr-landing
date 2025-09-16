import Container from "@/app/components/ui/container";
import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { promises as fs } from "fs";
import path from "path";

// This is a Server Component
async function getPrivacyPolicyContent() {
  const filePath = path.join(process.cwd(), "app/views/term/pp/pp.md");
  const content = await fs.readFile(filePath, "utf8");
  return content;
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicyContent();

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="prose dark:prose-invert max-w-none py-8 md:py-12">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>
      </Suspense>
    </Container>
  );
}
