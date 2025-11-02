-- Database schema for masa86 blog
-- D1 Database

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]', -- JSON array of tags
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);

-- Index for ordering by created_at
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);

-- Trigger to automatically update updated_at
CREATE TRIGGER IF NOT EXISTS update_posts_updated_at
AFTER UPDATE ON posts
FOR EACH ROW
BEGIN
  UPDATE posts SET updated_at = datetime('now') WHERE id = NEW.id;
END;
