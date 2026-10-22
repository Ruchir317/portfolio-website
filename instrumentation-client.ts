// Vercel BotID: the browser attaches a challenge answer to requests for these routes, and the route checks it
// with checkBotId(). Only requests made by this site's own JavaScript carry it, so the resume cannot be fetched
// by a plain crawler or script.
import { initBotId } from "botid/client/core";

initBotId({
  protect: [{ path: "/api/resume", method: "POST" }],
});
