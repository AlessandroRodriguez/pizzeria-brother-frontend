import { useEffect, useState } from "react";
import axios from "axios";

const Cajero = () => {
  const [pedidos, setPedidos] = useState([]);

  // Cargar pedidos pendientes al iniciar
  useEffect(() => {
    axios.get("http://localhost:8080/pedidos/pendientes")
      .then((res) => setPedidos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cobrarPedido = async (id) => {
    try {
      await axios.put(`http://localhost:8080/pedidos/cobrar/${id}`);
      setPedidos(pedidos.filter((p) => p.id !== id)); // Eliminar de la lista
      alert("✅ Pedido cobrado con éxito");
    } catch (error) {
      console.log(error);
      alert("❌ Error al cobrar el pedido");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f9d7a0] p-4">

      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Cajero – Pedidos Pendientes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {pedidos.length === 0 ? (
          <p className="text-white text-center col-span-full">
            No hay pedidos pendientes por cobrar
          </p>
        ) : (
          pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-[#fff3d6] rounded-3xl p-6 shadow-xl flex flex-col gap-2"
            >
              <h2 className="text-xl font-bold text-[#d8342c]">
                Pedido #{pedido.id}
              </h2>

              <p><strong>Mesa:</strong> {pedido.mesa}</p>
              <p><strong>Mesero:</strong> {pedido.mesero}</p>

              <div>
                <strong>Productos:</strong>
                <ul className="list-disc pl-6">
                  {pedido.items.map((item, i) => (
                    <li key={i}>
                      {item.cantidad}x {item.nombre} – S/ {item.subtotal}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-lg font-bold mt-2">
                Total: S/ {pedido.total}
              </p>

              <button
                onClick={() => cobrarPedido(pedido.id)}
                className="bg-green-600 text-white py-2 rounded-xl mt-3 hover:bg-green-700"
              >
                COBRAR
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default Cajero;
