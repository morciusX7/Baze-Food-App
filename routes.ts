/**
 * An Array of routes that are publicy accessible
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * An Array of routes that are used for authentication
 * These routes will redirect logged in users
 * @type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/student/auth/login",
  "/student/auth/register",
  "/vendor/auth/login",
  "/vendor/auth/register",
];

/**
 * The prefix for API authentication routes
 * Rotes tat start with this prefix are used for AI authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/restaurant/dashboard";

/**
 * The default redirect path after student login in
 * @type {string}
 */

export const DEFAULT_STUDENT_LOGIN_REDIRECT = "/restaurant/dashboard";
