import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Mesas = () => {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    try {
      const res = await axios.get("http://localhost:8085/api/mesas");

      if (res.data && res.data.length > 0) {
        const mesasNormalizadas = res.data.map((m) => ({
          id: m.id,
          numero: m.numero,
          estado: m.estado.toLowerCase(),
        }));

        setMesas(mesasNormalizadas);
        return;
      }

      // Si no hay mesas en backend → fallback 12 mesas
      const mesasGeneradas = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        numero: i + 1,
        estado: "disponible",
      }));

      setMesas(mesasGeneradas);

    } catch (e) {
      console.log("Error cargando mesas →", e);

      const mesasGeneradas = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        numero: i + 1,
        estado: "disponible",
      }));

      setMesas(mesasGeneradas);
    }
  };

  // 👉 SOLO seleccionar, NO ocupar mesa todavía
  const seleccionarMesa = (m) => {
    if (m.estado !== "disponible") {
      alert("Esta mesa no está disponible");
      return;
    }

    setMesaSeleccionada(m.id);
  };

  // 👉 YA NO OCUPA LA MESA AQUÍ
  // Solo navega a productos
  const confirmarMesa = () => {
    if (!mesaSeleccionada) {
      alert("Seleccione una mesa disponible");
      return;
    }

    navigate("/mesero/productos", {
      state: { mesa: mesaSeleccionada }
    });
  };

  const colors = {
    disponible: "bg-[#e5e5e5] text-gray-700",
    ocupada: "bg-[#ff6b6b] text-white",
    reservada: "bg-[#74a9ff] text-white",
  };

  const labels = {
    disponible: "",
    ocupada: "OCUPADA",
    reservada: "RESERVADA",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f6a96f] p-10 relative">

      {/* REGRESAR */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 bg-[#f3d97a] hover:bg-[#e9c65c] px-6 py-2 rounded-full shadow font-bold"
      >
        ⬅ REGRESAR
      </button>

      {/* TÍTULO */}
      <h1 className="text-4xl text-white font-bold text-center mb-10">
        SELECCIONAR MESA
      </h1>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="bg-[#e8dfb6] p-12 rounded-3xl shadow-xl max-w-5xl mx-auto">
        <div className="grid grid-cols-4 gap-10 place-items-center">
          {mesas.map((m) => (
            <div
              key={m.id}
              className={`
                w-28 h-28 rounded-2xl flex flex-col items-center justify-center
                border border-gray-400 shadow-md cursor-pointer transition-all
                hover:scale-105 text-xl font-semibold
                ${colors[m.estado]}
                ${mesaSeleccionada === m.id ? "ring-4 ring-yellow-300 scale-110" : ""}
              `}
              onClick={() => seleccionarMesa(m)}
            >
              <span>{String(m.numero).padStart(2, "0")}</span>
              {labels[m.estado] && (
                <span className="text-xs mt-1 tracking-wider">
                  {labels[m.estado]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 w-full px-10 flex justify-between">

        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow font-bold"
        >
          CERRAR SESIÓN ↩
        </button>

        <button
          onClick={confirmarMesa}
          className={`
            px-10 py-3 rounded-xl text-white font-bold shadow-xl
            ${
              mesaSeleccionada
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
