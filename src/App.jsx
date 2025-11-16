// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// LOGIN
import Login from "./pages/Login";

// MESERO
import Mesas from "./pages/mesero/Mesas";
import Productos from "./pages/mesero/Productos";

function App() {
  return (
    <BrowserRouter>   {/* 🔥 SIN ESTO NADA FUNCIONA */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/mesero/mesas" element={<Mesas />} />
        <Route path="/mesero/productos" element={<Productos />} />

        {/* fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
