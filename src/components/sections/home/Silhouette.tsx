/** A stand-in for a portrait until TRC supplies a real client photo. */
export function Silhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 125" aria-hidden="true" preserveAspectRatio="xMidYMax meet" className={className}>
      <circle cx="50" cy="48" r="19" />
      <path d="M12 125c0-30 17-46 38-46s38 16 38 46Z" />
    </svg>
  );
}
