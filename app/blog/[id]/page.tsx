import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/src/components/Layout";
import { getBlogPostById, blogPosts } from "@/src/data/blogPosts";

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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostById(Number(params.id));

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostById(Number(params.id));

  if (!post) {
    notFound();
  }

  return (
    <Layout>
      <main id="main-content" className="min-h-screen pt-32 pb-20">
        <div className="container-custom">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8 transition-colors duration-300"
          >
            <span>←</span>
            Back to Blog
          </Link>

          <article className="max-w-4xl mx-auto px-4">
            <div className="bg-white/60 dark:bg-muted-800/60 border border-muted-200 dark:border-muted-700 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="px-2 sm:px-3 py-1 text-[10px] xs:text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800">
                  {post.category}
                </span>
                <span className="text-[10px] xs:text-xs text-muted-600 dark:text-muted-400">{post.readTime}</span>
                <time className="text-[10px] xs:text-xs text-muted-600 dark:text-muted-400 ml-auto" dateTime={post.date}>
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
                  {post.content.split('\n\n').map((paragraph, index) => {
                    // Check if paragraph is a code block
                    if (paragraph.startsWith('```')) {
                      const codeMatch = paragraph.match(/```(\w+)?\n([\s\S]*?)```/);
                      if (codeMatch) {
                        const [, language, code] = codeMatch;
                        return (
                          <pre
                            key={index}
                            className="bg-muted-900 dark:bg-muted-950 p-3 sm:p-4 rounded-lg overflow-x-auto border border-muted-700 text-xs sm:text-sm"
                          >
                            <code className="text-muted-200 font-mono">
                              {code.trim()}
                            </code>
                          </pre>
                        );
                      }
                    }
                    // Check if paragraph is a heading
                    if (paragraph.startsWith('## ')) {
                      const heading = paragraph.replace(/^##\s+/, '');
                      return (
                        <h2
                          key={index}
                          className="text-xl sm:text-2xl font-bold text-muted-900 dark:text-muted-50 mt-6 sm:mt-8 mb-3 sm:mb-4"
                        >
                          {heading}
                        </h2>
                      );
                    }
                    // Check if paragraph is a list item
                    if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                      const items = paragraph.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                          {items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-muted-700 dark:text-muted-300">
                              {item.replace(/^[-*]\s+/, '')}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    // Regular paragraph
                    if (paragraph.trim()) {
                      return (
                        <p key={index} className="leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    }
                    return null;
                  })}
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
    </Layout>
  );
}

