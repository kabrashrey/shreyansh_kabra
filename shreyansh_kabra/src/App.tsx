import React, { Suspense } from "react";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import About from "./components/about/about";

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
  return (
    <div>
      <Navbar />
      <main className="content">
        <About />

        <Suspense fallback={null}>
          <Experiences />
        </Suspense>

        <Suspense fallback={null}>
          <Projects />
        </Suspense>

        <Suspense fallback={null}>
          <Technical />
        </Suspense>

        <Suspense fallback={null}>
          <Education />
        </Suspense>

        <Suspense fallback={null}>
          <Communication />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
