/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // The resume PDF is not in git. It lives in a public Vercel Blob store; /resume.pdf serves it under this site's own URL.
  // To update it, upload a new file named resume.pdf to the store (overwriting); it shows within the cache time (1 hour).
  async rewrites() {
    return [
      {
        source: "/resume.pdf",
        destination: "https://x7ac48jtg95zmn4d.public.blob.vercel-storage.com/resume.pdf",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Report-only: the browser logs violations but blocks nothing. The inline theme script, theme style and
          // JSON-LD need 'unsafe-inline' on a static site; enforce this only after every route shows no violations.
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
