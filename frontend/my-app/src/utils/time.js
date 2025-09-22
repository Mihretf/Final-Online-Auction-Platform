import dayjs from "dayjs";

export function formatTimeRemaining(endTime) {
  const now = dayjs();
  const end = dayjs(endTime);

  if (!end.isValid()) return "Invalid date";

  const diffMs = end.diff(now);
  if (diffMs <= 0) return "Auction ended";

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
