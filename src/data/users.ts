export interface User {
  id: string;
  name: string;
}

export const currentUserId = "marty_mcfly";

export type UserPresenceStatus = "online" | "offline" | "none";

export function getUserPresenceStatus(userId: string): UserPresenceStatus {
  return currentUserId === userId ? "none" : "online";
}
