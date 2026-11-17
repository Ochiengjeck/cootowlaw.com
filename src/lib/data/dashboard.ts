import "server-only";
import { adminListContactSubmissions } from "./contact";
import { adminListJobApplications } from "./job-applications";

export async function getNeedsAttentionCounts() {
  const [messages, applications] = await Promise.all([
    adminListContactSubmissions(),
    adminListJobApplications(),
  ]);

  return {
    pendingMessages: messages.filter((m) => !m.handledAt).length,
    pendingApplications: applications.filter((a) => !a.handledAt).length,
  };
}
