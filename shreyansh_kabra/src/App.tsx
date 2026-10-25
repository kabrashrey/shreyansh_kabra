import React, { Suspense } from "react";
// Self-hosted fonts (Latin subset only), bundled by Vite
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/inter-tight/latin-400.css";
import "@fontsource/inter-tight/latin-500.css";
import "@fontsource/inter-tight/latin-600.css";
import "@fontsource/inter-tight/latin-700.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import ScrollProgress from "./components/scrollProgress/ScrollProgress";
import Ambient from "./components/ambient/Ambient";
import CommandPalette from "./components/commandPalette/CommandPalette";
import KeyboardShortcuts from "./components/shortcuts/KeyboardShortcuts";
import Toast from "./components/toast/Toast";
import Hero from "./components/hero/hero";
import About from "./components/about/about";
import SectionSkeleton from "./components/skeleton/SectionSkeleton";
import { useSpotlight } from "./hooks/useSpotlight";

// Lazy loading components to optimize performance
const Projects = React.lazy(() => import("./components/projects/projects"));
const Experiences = React.lazy(
  () => import("./components/experiences/experiences")
);
const Communication = React.lazy(
  () => import("./components/communication/communication")
);
const Education = React.lazy(() => import("./components/education/education"));
const Technical = React.lazy(() => import("./components/technical/technical"));

function App() {
  useSpotlight();

  return (
    <div>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Ambient />
      <CommandPalette />
      <KeyboardShortcuts />
      <Toast />
      <ScrollProgress />
      <Navbar />
      <main className="content" id="main">
        <Hero />
        <About />

        <Suspense fallback={<SectionSkeleton />}>
          <Experiences />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Technical />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Communication />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
