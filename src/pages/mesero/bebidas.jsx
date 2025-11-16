// src/pages/mesero/bebidas.jsx

import { useNavigate } from "react-router-dom";

const Bebidas = () => {
  const navigate = useNavigate();

  const bebidas = [
    { id: 1, nombre: "Coca-Cola 500ml", precio: 6 },
    { id: 2, nombre: "Inca Kola 500ml", precio: 6 },
    { id: 3, nombre: "Agua San Luis", precio: 4 },
  ];

  return (
    <div className="min-h-screen bg-[#fff3d6] p-10">
      <button 
        onClick={() => navigate("/mesero/categorias")}
        className="mb-6 px-4 py-2 bg-[#d8342c] text-white rounded-xl"
      >
        ⬅ Volver
      </button>

      <h1 className="text-4xl font-bold text-[#d8342c] mb-6">Bebidas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bebidas.map((b) => (
          <div key={b.id} className="p-6 bg-white rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-[#b72c23]">{b.nombre}</h2>
            <p className="text-lg text-gray-600">S/ {b.precio}.00</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bebidas;
