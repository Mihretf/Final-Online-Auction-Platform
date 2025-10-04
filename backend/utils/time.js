export function formatTimeRemaining(endTime) {
  const now = new Date();
  const end = new Date(endTime);

  const diff = end - now; // difference in milliseconds
  if (diff <= 0) return "ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days > 0 ? days + "d " : ""}${hours}h ${minutes}m ${seconds}s`;
}
