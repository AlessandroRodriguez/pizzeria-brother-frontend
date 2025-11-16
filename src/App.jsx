// src/App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";

// LOGIN
import Login from "./pages/Login";

// MESERO
import Mesas from "./pages/mesero/Mesas";
import Productos from "./pages/mesero/Productos";

// CAJERO
import Cajero from "./pages/caja/Cajero";

// COCINA (lo agregamos por orden, aunque luego llenamos la pantalla)
import Cocina from "./pages/cocina/Cocina";

// ADMIN (luego agregamos sus vistas)
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* MESERO */}
        <Route path="/mesero/mesas" element={<Mesas />} />
        <Route path="/mesero/productos" element={<Productos />} />

        {/* CAJERO */}
        <Route path="/cajero" element={<Cajero />} />

        {/* COCINA */}
        <Route path="/cocina" element={<Cocina />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* fallback */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
