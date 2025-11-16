// src/pages/mesero/postres.jsx

import { useNavigate } from "react-router-dom";

const Postres = () => {
  const navigate = useNavigate();

  const postres = [
    { id: 1, nombre: "Helado de Vainilla", precio: 8 },
    { id: 2, nombre: "Torta de Chocolate", precio: 12 },
    { id: 3, nombre: "Cheesecake", precio: 14 },
  ];

  return (
    <div className="min-h-screen bg-[#fff3d6] p-10">
      <button 
        onClick={() => navigate("/mesero/categorias")}
        className="mb-6 px-4 py-2 bg-[#d8342c] text-white rounded-xl"
      >
        ⬅ Volver
      </button>

      <h1 className="text-4xl font-bold text-[#d8342c] mb-6">Postres</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {postres.map((p) => (
          <div key={p.id} className="p-6 bg-white rounded-2xl shadow-lg border">
            <h2 className="text-2xl font-semibold text-[#b72c23]">{p.nombre}</h2>
            <p className="text-lg text-gray-600">S/ {p.precio}.00</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postres;
