import { checkBotId } from "botid/server";
import { makeLink } from "@/lib/resumeLink";

// The resume PDF lives in a private Vercel Blob store (never in git, no public URL). This route runs the BotID
// check, which only the page's own JavaScript can pass, and answers with a link that works for one minute
// (see /api/resume/file). In local development checkBotId() always says "human", but the Blob token is not set,
// so this answers 502 unless the env vars are pulled.
export async function POST() {
  const verification = await checkBotId();
  if (verification.isBot) {
    return Response.json({ error: "Access denied" }, { status: 403 });
  }

  const secret = process.env.BLOB_READ_WRITE_TOKEN;
  if (!secret) {
    console.error("resume: BLOB_READ_WRITE_TOKEN is not set");
    return new Response("Resume unavailable", { status: 502 });
  }
  return Response.json({ url: makeLink(secret) }, { headers: { "Cache-Control": "no-store" } });
}
