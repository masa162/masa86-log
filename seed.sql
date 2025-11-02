-- Sample data for testing
INSERT INTO posts (slug, title, content, tags, created_at, updated_at) VALUES
('0002', 'はじめまして - masa86ブログ開始', '# はじめまして

このブログでは、技術的な学びや日々の開発で得た知識を記録していきます。

## このブログについて

- Next.js 16
- Cloudflare Pages
- D1 Database

で構築しています。

よろしくお願いします！', '["お知らせ", "技術"]', datetime('now'), datetime('now')),

('0003', 'Cloudflare Pagesでブログを構築した話', '# Cloudflare Pagesでブログを構築

## 技術スタック

- **Next.js 16**: 最新のReactフレームワーク
- **OpenNext**: Cloudflare Workers対応アダプター
- **D1 Database**: Cloudflareのエッジデータベース
- **TypeScript**: 型安全な開発

## なぜCloudflare Pages?

1. 高速なエッジネットワーク
2. 無料枠が充実
3. D1との統合が簡単

## まとめ

Cloudflare Pagesは素晴らしいプラットフォームです！', '["Cloudflare", "Next.js", "技術"]', datetime('now'), datetime('now'));
