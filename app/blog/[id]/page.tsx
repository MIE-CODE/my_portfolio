import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostById, blogPosts } from "@/src/data/blogPosts";
import { CodeBlock } from "@/src/components/CodeBlock";
import { JsonLd } from "@/src/components/JsonLd";
import { buildArticleMetadata } from "@/src/seo/buildMetadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/src/seo/jsonLd";
import { blogPostSeo } from "@/src/seo/pages";

// Helper function to parse markdown content
function parseMarkdown(text: string, startKey: number): JSX.Element[] {
  const parts: JSX.Element[] = [];
  let keyIndex = startKey;
  
  // Split by double newlines to get paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  
  paragraphs.forEach((paragraph) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;

    // Check for headings
    if (trimmed.startsWith('## ')) {
      const heading = trimmed.replace(/^##\s+/, '');
      parts.push(
        <h2
          key={keyIndex++}
          className="text-xl sm:text-2xl font-bold text-muted-900 dark:text-muted-50 mt-8 sm:mt-10 mb-4 sm:mb-6"
        >
          {heading}
        </h2>
      );
      return;
    }

    if (trimmed.startsWith('### ')) {
      const heading = trimmed.replace(/^###\s+/, '');
      parts.push(
        <h3
          key={keyIndex++}
          className="text-lg sm:text-xl font-bold text-muted-900 dark:text-muted-50 mt-6 sm:mt-8 mb-3 sm:mb-4"
        >
          {heading}
        </h3>
      );
      return;
    }

    // Check for lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || /^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter(line => {
        const trimmedLine = line.trim();
        return trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\.\s/.test(trimmedLine);
      });
      
      const isOrdered = /^\d+\.\s/.test(items[0]?.trim() || '');
      const ListTag = isOrdered ? 'ol' : 'ul';
      
      parts.push(
        <ListTag 
          key={keyIndex++} 
          className={`${isOrdered ? 'list-decimal' : 'list-disc'} list-inside space-y-2 ml-4 sm:ml-6`}
        >
          {items.map((item, itemIndex) => {
            const cleanItem = item.trim().replace(/^[-*\d+\.]\s+/, '');
            // Parse inline code and bold text
            const processedItem = parseInlineMarkdown(cleanItem);
            return (
              <li key={itemIndex} className="text-muted-700 dark:text-muted-300 leading-relaxed">
                {processedItem.length > 0 ? processedItem : cleanItem}
              </li>
            );
          })}
        </ListTag>
      );
      return;
    }

    // Regular paragraph with inline markdown
    const processedParagraph = parseInlineMarkdown(trimmed);
    parts.push(
      <p key={keyIndex++} className="leading-relaxed mb-4">
        {processedParagraph.length > 0 ? processedParagraph : trimmed}
      </p>
    );
  });

  return parts;
}

// Helper function to parse inline markdown (bold, code, links)
function parseInlineMarkdown(text: string): (string | JSX.Element)[] {
  const result: (string | JSX.Element)[] = [];
  let keyIndex = 0;
  let lastIndex = 0;
  
  // Find all matches (code, bold, links) with their positions
  const matches: Array<{
    index: number;
    endIndex: number;
    type: 'code' | 'bold' | 'link';
    content: string;
    extra?: string;
  }> = [];

  // Find inline code
  const codeRegex = /`([^`]+)`/g;
  let match;
  while ((match = codeRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      endIndex: match.index + match[0].length,
      type: 'code',
      content: match[1],
    });
  }

  // Find bold text
  const boldRegex = /\*\*([^*]+)\*\*/g;
  while ((match = boldRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      endIndex: match.index + match[0].length,
      type: 'bold',
      content: match[1],
    });
  }

  // Find links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = linkRegex.exec(text)) !== null) {
    matches.push({
      index: match.index,
      endIndex: match.index + match[0].length,
      type: 'link',
      content: match[1],
      extra: match[2],
    });
  }

  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);

  // Remove overlapping matches (keep the first one)
  const filteredMatches: typeof matches = [];
  matches.forEach((match) => {
    const overlaps = filteredMatches.some(
      (existing) =>
        (match.index >= existing.index && match.index < existing.endIndex) ||
        (match.endIndex > existing.index && match.endIndex <= existing.endIndex) ||
        (match.index <= existing.index && match.endIndex >= existing.endIndex)
    );
    if (!overlaps) {
      filteredMatches.push(match);
    }
  });

  // Build result array
  filteredMatches.forEach((match) => {
    // Add text before match
    if (match.index > lastIndex) {
      const textBefore = text.slice(lastIndex, match.index);
      if (textBefore) {
        result.push(textBefore);
      }
    }

    // Add the matched element
    if (match.type === 'code') {
      result.push(
        <code key={`code-${keyIndex++}`} className="px-1.5 py-0.5 bg-muted-200 dark:bg-muted-800 rounded text-xs font-mono text-primary-700 dark:text-primary-300">
          {match.content}
        </code>
      );
    } else if (match.type === 'bold') {
      result.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-muted-900 dark:text-muted-50">
          {match.content}
        </strong>
      );
    } else if (match.type === 'link') {
      result.push(
        <a
          key={`link-${keyIndex++}`}
          href={match.extra}
          target={match.extra?.startsWith('http') ? '_blank' : undefined}
          rel={match.extra?.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline"
        >
          {match.content}
        </a>
      );
    }

    lastIndex = match.endIndex;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? result : [text];
}

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPostById(Number(params.id));

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildArticleMetadata(blogPostSeo(post));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostById(Number(params.id));

  if (!post) {
    notFound();
  }

  const seo = blogPostSeo(post);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: seo.path },
          ]),
          articleJsonLd({
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            category: post.category,
            path: seo.path,
          }),
        ]}
      />
      <main id="main-content" className="page-shell">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors duration-300"
          >
            <span>←</span>
            Back to Blog
          </Link>

          <article className="max-w-4xl mx-auto">
            <div className="bg-muted-100/95 dark:bg-muted-900/90 border border-muted-200/95 dark:border-muted-700 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 backdrop-blur-md shadow-[0_2px_10px_rgba(28,25,23,0.08)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="px-2 sm:px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800">
                  {post.category}
                </span>
                <span className="text-xs text-muted-600 dark:text-muted-400">{post.readTime}</span>
                <time className="text-xs text-muted-600 dark:text-muted-400 ml-auto" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-900 dark:text-muted-50 mb-4 sm:mb-6">
                {post.title}
              </h1>

              <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none">
                <p className="text-base sm:text-lg text-muted-700 dark:text-muted-300 leading-relaxed mb-6 sm:mb-8 font-medium">
                  {post.excerpt}
                </p>
                <div className="text-base text-muted-700 dark:text-muted-300 leading-relaxed space-y-6">
                  {(() => {
                    const content = post.content;
                    const parts: JSX.Element[] = [];
                    let keyIndex = 0;

                    // Split content by code blocks first
                    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
                    let lastIndex = 0;
                    let match;

                    while ((match = codeBlockRegex.exec(content)) !== null) {
                      // Add text before code block
                      if (match.index > lastIndex) {
                        const textBefore = content.slice(lastIndex, match.index);
                        parts.push(...parseMarkdown(textBefore, keyIndex));
                        keyIndex += 1000;
                      }

                      // Add code block
                      const language = match[1] || '';
                      const code = match[2].trim();
                      parts.push(
                        <CodeBlock key={keyIndex++} language={language} code={code} />
                      );

                      lastIndex = codeBlockRegex.lastIndex;
                    }

                    // Add remaining text
                    if (lastIndex < content.length) {
                      const remainingText = content.slice(lastIndex);
                      parts.push(...parseMarkdown(remainingText, keyIndex));
                    }

                    return parts;
                  })()}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-muted-200 dark:border-muted-700">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                >
                  <span>←</span>
                  Back to all posts
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

