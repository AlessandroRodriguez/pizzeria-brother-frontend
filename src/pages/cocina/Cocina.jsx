import { useEffect, useState } from "react";
import axios from "axios";

const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/pedidos/pendientes-cocina");
      setPedidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const marcarPreparacion = async (id) => {
    await axios.put(`http://localhost:8080/api/pedidos/preparar/${id}`);
    cargarPedidos();
  };

  const marcarTerminado = async (id) => {
    await axios.put(`http://localhost:8080/api/pedidos/terminar/${id}`);
    cargarPedidos();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-700 to-yellow-400 p-5">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Cocina – Pedidos en preparación
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pedidos.length === 0 ? (
          <p className="text-white text-center col-span-full">
            No hay pedidos para preparar
          </p>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-white p-6 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-orange-700">Pedido #{pedido.id}</h2>
              <p><strong>Mesa:</strong> {pedido.mesa.id}</p>

              <div>
                <strong>Productos:</strong>
                <ul className="pl-6 list-disc">
                  {pedido.detalles.map((d, i) => (
                    <li key={i}>
                      {d.cantidad}x {d.producto.nombre}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <button
                  onClick={() => marcarPreparacion(pedido.id)}
                  className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-800"
                >
                  MARCAR EN PREPARACIÓN
                </button>

                <button
                  onClick={() => marcarTerminado(pedido.id)}
                  className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-800"
                >
                  MARCAR TERMINADO
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cocina;
