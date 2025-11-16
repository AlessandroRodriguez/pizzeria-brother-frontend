import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Mesas = () => {
  const navigate = useNavigate();
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const mesas = [
    { id: 1, estado: "disponible" },
    { id: 2, estado: "ocupado" },
    { id: 3, estado: "disponible" },
    { id: 4, estado: "reservado" },
    { id: 5, estado: "disponible" },
    { id: 6, estado: "disponible" },
    { id: 7, estado: "reservado" },
    { id: 8, estado: "disponible" },
    { id: 9, estado: "disponible" },
    { id: 10, estado: "disponible" },
    { id: 11, estado: "ocupado" },
    { id: 12, estado: "disponible" },
  ];

  const colors = {
    disponible: "bg-gray-200 text-black",
    ocupado: "bg-red-500 text-white",
    reservado: "bg-blue-500 text-white",
  };

  const labels = {
    disponible: "",
    ocupado: "OCUPADO",
    reservado: "RESERVADO",
  };

  const irAProductos = () => {
    if (!mesaSeleccionada) {
      alert("Seleccione una mesa disponible");
      return;
    }
    navigate("/mesero/productos", { state: { mesa: mesaSeleccionada } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f6a96f] p-10 relative">

      {/* REGRESAR */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-[#f6d57b] px-6 py-2 rounded-full shadow font-bold"
      >
        ⬅ REGRESAR
      </button>

      {/* TÍTULO */}
      <h1 className="text-3xl text-white font-extrabold text-center mb-10">
        SELECCIONAR MESA
      </h1>

      {/* CUADRO DE MESAS */}
      <div className="bg-[#ebe1ba] p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto">

        <div className="grid grid-cols-3 gap-10 place-items-center">
          {mesas.map((m) => (
            <div
              key={m.id}
              className={`
                w-24 h-24 rounded-xl shadow-lg 
                flex flex-col items-center justify-center 
                text-xl font-bold cursor-pointer transition-all 
                hover:scale-105
                ${colors[m.estado]}
                ${mesaSeleccionada === m.id ? "ring-4 ring-yellow-300 scale-110" : ""}
              `}
              onClick={() =>
                m.estado === "disponible" && setMesaSeleccionada(m.id)
              }
            >
              {String(m.id).padStart(2, "0")}
              {labels[m.estado] && (
                <span className="text-xs">{labels[m.estado]}</span>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* ⭐ BOTONES INFERIORES — YA NO SE MONTAN ⭐ */}
      <div className="absolute bottom-6 w-full px-10 flex justify-between items-center">

        {/* CERRAR SESIÓN */}
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-xl font-bold"
        >
          CERRAR SESIÓN ↩
        </button>

        {/* CONFIRMAR */}
        <button
          onClick={irAProductos}
          className={`
            px-10 py-3 rounded-xl text-white font-bold shadow-xl
            ${mesaSeleccionada 
              ? "bg-green-700 hover:bg-green-800"
              : "bg-gray-500 opacity-50 cursor-not-allowed"
            }
          `}
        >
          CONFIRMAR
        </button>

      </div>

    </div>
  );
};

export default Mesas;
