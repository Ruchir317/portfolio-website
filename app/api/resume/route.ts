import { checkBotId } from "botid/server";
import { get } from "@vercel/blob";

// The resume PDF lives in a private Vercel Blob store (never in git, no public URL). Only a request that passes
// the BotID check, which the page's own JavaScript makes, gets the file. In local development checkBotId() always
// says "human", but the private store has no token there, so this answers 502 unless the env vars are pulled.
export async function POST() {
  const verification = await checkBotId();
  if (verification.isBot) {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const result = await get("resume.pdf", { access: "private" });
    if (result?.statusCode !== 200) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(result.stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Ruchir-Jadhav-Resume.pdf"',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Resume unavailable", { status: 502 });
  }
}
