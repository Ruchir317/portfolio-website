export type ResumeResult = "opened" | "blocked" | "failed";

// Fetches the resume from the BotID-protected route and shows it in a new tab. The tab is opened inside the click
// (before the fetch) so popup blockers allow it; it is pointed at the PDF once the file has arrived. A plain link
// to the file cannot work: BotID only recognises requests made by this site's JavaScript.
export async function openResume(): Promise<ResumeResult> {
  const tab = window.open("", "_blank");
  try {
    const res = await fetch("/api/resume", { method: "POST" });
    if (!res.ok) {
      tab?.close();
      return res.status === 403 ? "blocked" : "failed";
    }
    const url = URL.createObjectURL(await res.blob());
    if (tab) tab.location.href = url;
    else window.location.assign(url);
    setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
    return "opened";
  } catch {
    tab?.close();
    return "failed";
  }
}
