import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./paginas/home/Home";
import NotFound from "./paginas/not-found/NotFound";
import Detalhes from "./paginas/detalhes/Detalhes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes/:id" element={<Detalhes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);
