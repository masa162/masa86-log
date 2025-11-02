import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "masa86 Blog",
  description: "技術ブログ - masa86の学習記録",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased min-h-screen bg-white">
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              masa86 Blog
            </a>
          </div>
        </header>
        <main className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
            © 2025 masa86 Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
