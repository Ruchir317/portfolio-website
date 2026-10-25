export type ResumeResult = "opened" | "blocked" | "failed";

// Asks the BotID-protected route for a 30-minute link to the PDF and opens it in a new tab. The tab is opened
// inside the click (before the fetch) so popup blockers allow it; it is pointed at the link once that arrives.
// The link is a normal URL, not a blob:, so saving the file from the viewer keeps its proper name. A plain link
// straight to the file cannot work: BotID only recognises requests made by this site's JavaScript.
export async function openResume(): Promise<ResumeResult> {
  const tab = window.open("", "_blank");
  try {
    const res = await fetch("/api/resume", { method: "POST" });
    if (!res.ok) {
      tab?.close();
      return res.status === 403 ? "blocked" : "failed";
    }
    const { url } = (await res.json()) as { url: string };
    if (tab) tab.location.href = url;
    else window.location.assign(url);
    return "opened";
  } catch {
    tab?.close();
    return "failed";
  }
}
