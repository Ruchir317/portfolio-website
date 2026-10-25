import { get } from "@vercel/blob";
import { isValidLink } from "@/lib/resumeLink";

// Serves the PDF to a link made by POST /api/resume. The signed link replaces a second BotID check: only a
// request that passed BotID gets one, and it stops working after a minute.
export async function GET(request: Request) {
  const secret = process.env.BLOB_READ_WRITE_TOKEN;
  if (!secret) {
    console.error("resume: BLOB_READ_WRITE_TOKEN is not set");
    return new Response("Resume unavailable", { status: 502 });
  }
  const { searchParams } = new URL(request.url);
  if (!isValidLink(secret, searchParams.get("exp"), searchParams.get("sig"))) {
    return new Response("This link has expired. Open the resume again from the site.", { status: 403 });
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
  } catch (error) {
    console.error("resume: could not read resume.pdf from the Blob store", error);
    return new Response("Resume unavailable", { status: 502 });
  }
}
