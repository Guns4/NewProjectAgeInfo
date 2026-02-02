/**
 * Edge Runtime & SEO Headers Examples - Fase 90.5
 */

// Example 1: Testing X-Robots-Tag Headers

/**
 * Public Pages (index, follow):
 * - / (homepage)
 * - /about
 * - /calculator
 * - /features
 * - /pricing
 *
 * Headers sent:
 * X-Robots-Tag: index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1
 */

/**
 * Private Pages (noindex, nofollow):
 * - /admin
 * - /dashboard
 * - /settings
 * - /preview
 * - /test
 * - /dev
 *
 * Headers sent:
 * X-Robots-Tag: noindex, nofollow, noarchive, nosnippet
 */

// Example 2: Verifying Headers in Browser

/**
 * Check headers in browser DevTools:
 *
 * 1. Open DevTools (F12)
 * 2. Go to Network tab
 * 3. Navigate to page
 * 4. Click on document request
 * 5. Check Response Headers
 *
 * Look for:
 * - X-Robots-Tag
 * - X-Content-Type-Options
 * - X-Frame-Options
 * - Referrer-Policy
 */

// Example 3: Edge Runtime Benefits

/**
 * Edge Runtime Configuration:
 * export const config = {
 *   runtime: 'experimental-edge'
 * }
 *
 * Benefits:
 * - Faster execution (runs at edge, closer to users)
 * - Lower latency (no cold starts)
 * - Better performance (optimized for speed)
 * - Global distribution (runs worldwide)
 *
 * Expected improvement:
 * - Middleware execution: <50ms (vs 200-500ms)
 * - Total request time: -30-40%
 * - User experience: Instant locale detection
 */

// Example 4: Adding Custom No-Index Paths

/**
 * To add more paths that should not be indexed:
 *
 * const noIndexPaths = [
 *   '/admin',
 *   '/dashboard',
 *   '/settings',
 *   '/preview',
 *   '/test',
 *   '/dev',
 *   '/api',
 *   '/_next',
 *   '/private',      // Add custom path
 *   '/internal',     // Add custom path
 *   '/staging',      // Add custom path
 * ];
 */

// Example 5: Testing SEO Crawler Access

/**
 * Test with User-Agent strings:
 *
 * curl -H "User-Agent: Googlebot" https://yoursite.com/
 * # Should see: X-Robots-Tag: index, follow
 *
 * curl -H "User-Agent: Googlebot" https://yoursite.com/admin
 * # Should see: X-Robots-Tag: noindex, nofollow
 */

// Example 6: Security Headers Explained

/**
 * X-Content-Type-Options: nosniff
 * - Prevents MIME type sniffing
 * - Protects against XSS attacks
 *
 * X-Frame-Options: DENY
 * - Prevents clickjacking attacks
 * - Page cannot be embedded in iframe
 *
 * Referrer-Policy: strict-origin-when-cross-origin
 * - Controls referrer information
 * - Sends full URL for same-origin, origin only for cross-origin
 *
 * X-DNS-Prefetch-Control: on
 * - Enables DNS prefetching
 * - Speeds up external resource loading
 */

// Example 7: Monitoring Edge Runtime

/**
 * In Vercel Dashboard:
 * 1. Go to Deployments
 * 2. Click on deployment
 * 3. Go to Functions tab
 * 4. Check middleware execution time
 * 
 * Expected metrics:
 * - Execution time: <50ms
 * - Cold start: None (edge is always warm)
 * - Memory usage: <10MB
 */
