import "./ambient.scss";

/**
 * Page-wide atmosphere layer: a fine paper-grain overlay. Purely decorative
 * and fixed behind all content; calmed by prefers-reduced-motion.
 */
const Ambient = () => {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grain" />
    </div>
  );
};

export default Ambient;
