import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NovaDenuncia } from "./pages/NovaDenuncia";
import { Obrigado } from "./pages/Obrigado";
import { Dashboard } from "./pages/Dashboard"; // 1. Importamos o Dashboard

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NovaDenuncia />} />
        <Route path="/obrigado" element={<Obrigado />} />
        
        {/* 2. Criamos a rota de administrador */}
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;