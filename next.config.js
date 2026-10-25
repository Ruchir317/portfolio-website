/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // The resume PDF is not in git and has no public URL: it lives in a private Vercel Blob store and is served by
  // app/api/resume after a BotID check. Old links to /resume.pdf land on the /resume page, which has the button.
  // To update the resume, upload a new resume.pdf to the store (overwrite); it is served fresh, never cached.
  async redirects() {
    return [{ source: "/resume.pdf", destination: "/resume", permanent: false }];
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
          // Enforced. The inline theme script, theme style and JSON-LD need 'unsafe-inline' on a static site, so this
          // does not stop injected inline script; it blocks other origins, plugins, framing and form posts elsewhere.
          // If a page breaks, switch this key back to Content-Security-Policy-Report-Only and read the console messages.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com",
              "font-src 'self'",
              "object-src 'self'",
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
