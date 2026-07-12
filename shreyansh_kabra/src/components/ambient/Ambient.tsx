import "./ambient.scss";

/**
 * Page-wide atmosphere layer: a slow animated gradient mesh plus a fine
 * film-grain overlay. Purely decorative and fixed behind all content.
 * Theme-aware (colors from CSS vars) and calmed by prefers-reduced-motion.
 */
const Ambient = () => {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-mesh">
        <span className="mesh-blob mesh-blob-1" />
        <span className="mesh-blob mesh-blob-2" />
        <span className="mesh-blob mesh-blob-3" />
      </div>
      <div className="ambient-grain" />
    </div>
  );
};

export default Ambient;
