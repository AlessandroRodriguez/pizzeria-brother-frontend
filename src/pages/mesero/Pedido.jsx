// src/pages/mesero/pedido.jsx

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ⛔ TEMPORAL → esto luego se conecta al carrito real
const pedidoEjemplo = [
  { id: 1, nombre: "Pizza Americana", cantidad: 1, precio: 25 },
  { id: 2, nombre: "Coca-Cola 500ml", cantidad: 2, precio: 6 },
  { id: 3, nombre: "Torta Chocolate", cantidad: 1, precio: 12 },
];

const Pedido = () => {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(pedidoEjemplo);

  const total = pedido.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const enviarCocina = () => {
    alert("🍕🔥 PEDIDO ENVIADO A COCINA");
    navigate("/mesero/mesas");
  };

  return (
    <div className="min-h-screen bg-[#fff3d6] p-10">

      {/* Volver */}
      <button
        onClick={() => navigate("/mesero/confirmar")}
        className="mb-6 px-4 py-2 bg-[#d8342c] text-white rounded-xl"
      >
        ⬅ Volver
      </button>

      {/* Título */}
      <h1 className="text-4xl font-bold text-[#d8342c] mb-8">
        Pedido Actual
      </h1>

      {/* Lista */}
      <div className="space-y-4">
        {pedido.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow-md border"
          >
            <h2 className="text-2xl font-semibold text-[#b72c23]">
              {item.nombre}
            </h2>

            <p className="text-lg text-gray-600">
              Cantidad: {item.cantidad}
            </p>

            <p className="text-lg text-gray-600">
              Subtotal: S/ {item.cantidad * item.precio}.00
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl border text-center">
        <h2 className="text-3xl font-bold text-[#b72c23]">
          Total: S/ {total}.00
        </h2>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4 mt-8">

        <button
          onClick={() => navigate("/mesero/confirmar")}
          className="py-4 bg-yellow-500 hover:bg-yellow-600 text-white text-2xl font-bold rounded-2xl shadow-lg"
        >
          ✏ Editar Pedido
        </button>

        <button
          onClick={enviarCocina}
          className="py-4 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold rounded-2xl shadow-lg"
        >
          🚀 Enviar a Cocina
        </button>

      </div>
    </div>
  );
};

export default Pedido;
