/**
 * Cloudflare environment bindings for OpenNext
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database;
      BASIC_AUTH_USER?: string;
      BASIC_AUTH_PASS?: string;
    }
  }
}

export {};
