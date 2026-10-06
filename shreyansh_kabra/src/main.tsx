import ReactDOM from "react-dom/client";
import Root from "./Root";

const container = document.getElementById("root")!;

// Production builds ship prerendered HTML (see scripts/prerender.mjs), so
// attach to it; the dev server serves an empty root, so render from scratch.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, <Root />);
} else {
  ReactDOM.createRoot(container).render(<Root />);
}
