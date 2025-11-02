/**
 * Utility functions
 */

import type { Post, PostRow } from '@/types/database';

/**
 * Convert PostRow from database to Post object
 */
export function postRowToPost(row: PostRow): Post {
  return {
    ...row,
    tags: JSON.parse(row.tags || '[]'),
  };
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 200): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

/**
 * Extract plain text from markdown
 */
export function markdownToPlainText(markdown: string): string {
  return markdown
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .replace(/!\[.*?\]\(.+?\)/g, '[画像]')
    .replace(/\n+/g, ' ')
    .trim();
}

/**
 * Simple Markdown to HTML converter (Edge Runtime compatible)
 */
export function markdownToHtml(markdown: string): string {
  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  const processInline = (text: string): string => {
    let result = text;

    // Images ![alt](url)
    result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4">');

    // Links [text](url)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Bold **text**
    result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    result = result.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Inline code `code`
    result = result.replace(/`([^`]+)`/g, '<code>$1</code>');

    return result;
  };

  const lines = markdown.split('\n');
  const output: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let inBlockquote = false;
  let blockquoteContent: string[] = [];

  for (const line of lines) {
    // Code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        output.push('<pre><code>' + escapeHtml(codeBlockContent.join('\n')) + '</code></pre>');
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Blockquotes
    if (line.trim().startsWith('>')) {
      if (!inBlockquote) {
        inBlockquote = true;
      }
      blockquoteContent.push(line.replace(/^>\s?/, ''));
      continue;
    } else if (inBlockquote) {
      output.push('<blockquote>' + processInline(blockquoteContent.join('\n')) + '</blockquote>');
      blockquoteContent = [];
      inBlockquote = false;
    }

    // Empty lines
    if (line.trim() === '') {
      output.push('<br>');
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      output.push('<h1>' + escapeHtml(line.substring(2)) + '</h1>');
    } else if (line.startsWith('## ')) {
      output.push('<h2>' + escapeHtml(line.substring(3)) + '</h2>');
    } else if (line.startsWith('### ')) {
      output.push('<h3>' + escapeHtml(line.substring(4)) + '</h3>');
    } else if (line.startsWith('#### ')) {
      output.push('<h4>' + escapeHtml(line.substring(5)) + '</h4>');
    } else if (line.startsWith('##### ')) {
      output.push('<h5>' + escapeHtml(line.substring(6)) + '</h5>');
    } else if (line.startsWith('###### ')) {
      output.push('<h6>' + escapeHtml(line.substring(7)) + '</h6>');
    }
    // Lists
    else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      output.push('<li>' + processInline(line.trim().substring(2)) + '</li>');
    }
    // Normal paragraphs
    else {
      output.push('<p>' + processInline(line) + '</p>');
    }
  }

  // Close any unclosed blockquote
  if (inBlockquote && blockquoteContent.length > 0) {
    output.push('<blockquote>' + processInline(blockquoteContent.join('\n')) + '</blockquote>');
  }

  return output.join('\n');
}

/**
 * Generate next slug (4-digit zero-padded)
 */
export function generateNextSlug(maxSlug: string | null): string {
  if (!maxSlug) {
    return '0001';
  }
  const nextNum = parseInt(maxSlug, 10) + 1;
  return nextNum.toString().padStart(4, '0');
}
