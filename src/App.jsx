// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// LOGIN
import Login from "./pages/Login";

// MESERO
import Mesas from "./pages/mesero/Mesas";
import Productos from "./pages/mesero/Productos";
import Carrito from "./pages/mesero/Carrito";   // 🔥 NUEVO

// CAJERO
import Cajero from "./pages/caja/Cajero";

// COCINA
import Cocina from "./pages/cocina/Cocina";

// GERENTE
import Gerente from "./pages/gerente/Gerente";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* MESERO */}
        <Route path="/mesero/mesas" element={<Mesas />} />
        <Route path="/mesero/productos" element={<Productos />} />
        <Route path="/mesero/carrito" element={<Carrito />} />  {/* 🔥 NUEVO */}

        {/* CAJERO */}
        <Route path="/cajero" element={<Cajero />} />

        {/* COCINA */}
        <Route path="/cocina" element={<Cocina />} />

        {/* GERENTE */}
        <Route path="/gerente" element={<Gerente />} />

        {/* Fallback (si escriben cualquier ruta rara) */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
