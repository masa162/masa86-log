/**
 * D1 Database client for OpenNext
 *
 * With OpenNext + nodejs_compat, process.env is properly populated with bindings
 */

import type { D1Database } from '@cloudflare/workers-types';

/**
 * Get D1 database instance
 * In OpenNext with nodejs_compat, process.env.DB is automatically populated
 */
export function getD1(): D1Database {
  if (process.env.DB) {
    return process.env.DB;
  }

  // Development fallback: return mock
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️  D1 binding not found - using mock database for development');
    return createMockD1();
  }

  throw new Error('D1 Database binding not configured');
}

/**
 * Create mock D1 for development
 */
function createMockD1(): D1Database {
  return {
    prepare: () => ({
      bind: () => ({
        all: async () => ({ results: [], success: true, meta: {} }),
        first: async () => null,
        run: async () => ({
          success: true,
          meta: { duration: 0, last_row_id: 0, changes: 0, served_by: '', internal_stats: null }
        }),
        raw: async () => [],
      }),
      all: async () => ({ results: [], success: true, meta: {} }),
      first: async () => null,
      run: async () => ({
        success: true,
        meta: { duration: 0, last_row_id: 0, changes: 0, served_by: '', internal_stats: null }
      }),
      raw: async () => [],
    }),
    dump: async () => new ArrayBuffer(0),
    batch: async () => [],
    exec: async () => ({ count: 0, duration: 0 }),
  } as any;
}
