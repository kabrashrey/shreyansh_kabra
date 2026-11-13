import "./skeleton.scss";

/**
 * Lightweight placeholder shown while a lazy section's chunk loads,
 * replacing the previous blank (null) fallback to avoid content flashes.
 */
const SectionSkeleton = () => {
  return (
    <div className="section-skeleton" aria-hidden="true">
      <div className="sk-heading" />
      <div className="sk-grid">
        <div className="sk-card" />
        <div className="sk-card" />
        <div className="sk-card" />
      </div>
    </div>
  );
};

export default SectionSkeleton;
