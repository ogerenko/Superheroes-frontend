import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HeroesList } from "./pages/HeroesList";
import { DetailHero } from "./pages/DetailHero";
import { App } from "./App";
import { HeroProvider } from "./context/HeroContext";

export const Root = () => (
  <HeroProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/heroes-list" element={<HeroesList />} />
        <Route path="/hero/:heroId" element={<DetailHero />} />
        <Route path="*" element={<div>Not found page!</div>} />
      </Routes>
    </Router>
  </HeroProvider>
);
