import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

const Gerente = () => {
  const [ventasDia, setVentasDia] = useState(0);
  const [ventasMes, setVentasMes] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    try {
      const res1 = await axios.get("http://localhost:8085/api/reportes/ventas-dia");
      const res2 = await axios.get("http://localhost:8085/api/reportes/ventas-mes");
      const res3 = await axios.get("http://localhost:8085/api/reportes/pedidos-total");
      const res4 = await axios.get("http://localhost:8085/api/reportes/productos-top");

      setVentasDia(res1.data.total);
      setVentasMes(res2.data.total);
      setTotalPedidos(res3.data.total);
      setProductosMasVendidos(res4.data);
    } catch (e) {
      console.log("Error cargando reportes", e);
    }
  };

  const colores = ["#ff5e57", "#1e90ff", "#2ecc71", "#f1c40f", "#8e44ad"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Panel del Gerente 👨‍💼
      </h1>

      {/* TARJETAS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/10 p-6 rounded-3xl shadow-xl backdrop-blur-md text-center">
          <h2 className="text-xl font-bold">Ventas del día</h2>
          <p className="text-4xl font-bold mt-3">S/ {ventasDia}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl shadow-xl backdrop-blur-md text-center">
          <h2 className="text-xl font-bold">Ventas del mes</h2>
          <p className="text-4xl font-bold mt-3">S/ {ventasMes}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-3xl shadow-xl backdrop-blur-md text-center">
          <h2 className="text-xl font-bold">Pedidos totales</h2>
          <p className="text-4xl font-bold mt-3">{totalPedidos}</p>
        </div>

      </div>

      {/* GRÁFICO DE PRODUCTOS MÁS VENDIDOS */}
      <div className="bg-white/10 p-8 rounded-3xl shadow-xl backdrop-blur-md">

        <h2 className="text-2xl font-bold text-center mb-5">
          Productos más vendidos 🥇
        </h2>

        {productosMasVendidos.length > 0 ? (
          <PieChart width={400} height={300} className="mx-auto">
            <Pie
              data={productosMasVendidos}
              dataKey="cantidad"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {productosMasVendidos.map((_, i) => (
                <Cell key={i} fill={colores[i % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p className="text-center text-xl mt-5">No hay datos disponibles</p>
        )}

      </div>

    </div>
  );
};

export default Gerente;
