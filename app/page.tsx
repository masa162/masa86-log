/**
 * Home Page - Display latest blog posts
 */

import { getD1 } from '@/lib/db';
import { postRowToPost, truncateText, markdownToPlainText } from '@/lib/utils';
import type { PostRow } from '@/types/database';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const db = getD1();

  const { results } = await db
    .prepare('SELECT * FROM posts ORDER BY created_at DESC LIMIT 10')
    .all<PostRow>();

  const posts = (results || []).map(postRowToPost);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">最新の記事</h1>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p>まだ記事がありません。</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post: any) => {
            const preview = truncateText(markdownToPlainText(post.content), 200);

            return (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/${post.slug}`} className="block no-underline">
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                  <div className="text-sm text-gray-500 mb-3">
                    {new Date(post.created_at).toLocaleDateString('ja-JP', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-gray-600">{preview}</p>
                </Link>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/admin"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          管理画面
        </Link>
      </div>
    </div>
  );
}
