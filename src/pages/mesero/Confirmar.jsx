// src/pages/mesero/confirmar.jsx

import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Ejemplo de pedido (luego lo conectas con tu CartContext)
const pedidoInicial = [
  { id: 1, nombre: "Pizza Americana", cantidad: 1, precio: 25 },
  { id: 2, nombre: "Coca-Cola 500ml", cantidad: 2, precio: 6 },
];

const ConfirmarPedido = () => {
  const navigate = useNavigate();

  const [pedido, setPedido] = useState(pedidoInicial);

  const eliminarItem = (id) => {
    setPedido(pedido.filter((p) => p.id !== id));
  };

  const total = pedido.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const enviarPedido = () => {
    alert("✅ Pedido enviado a cocina");
    navigate("/mesero/mesas");
  };

  return (
    <div className="min-h-screen bg-[#fff3d6] p-10">

      {/* Volver */}
      <button
        onClick={() => navigate("/mesero/categorias")}
        className="mb-6 px-4 py-2 bg-[#d8342c] text-white rounded-xl"
      >
        ⬅ Volver
      </button>

      {/* Título */}
      <h1 className="text-4xl font-bold text-[#d8342c] mb-8">
        Confirmar Pedido
      </h1>

      {/* Lista de items */}
      <div className="space-y-4">
        {pedido.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow-md border flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-[#b72c23]">
                {item.nombre}
              </h2>
              <p className="text-gray-600">
                Cantidad: {item.cantidad}
              </p>
              <p className="text-gray-600">
                Subtotal: S/ {item.cantidad * item.precio}.00
              </p>
            </div>

            <button
              onClick={() => eliminarItem(item.id)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg"
            >
              🗑 Eliminar
            </button>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-xl border text-center">
        <h2 className="text-3xl font-bold text-[#b72c23]">
          Total: S/ {total}.00
        </h2>
      </div>

      {/* Confirmar Pedido */}
      <button
        onClick={enviarPedido}
        className="mt-8 w-full py-4 bg-[#d8342c] hover:bg-[#b72c23] text-white text-2xl font-bold rounded-2xl shadow-lg transition"
      >
        ✔ Confirmar Pedido
      </button>
    </div>
  );
};

export default ConfirmarPedido;
