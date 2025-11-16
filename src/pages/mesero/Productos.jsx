// src/pages/mesero/Productos.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const navigate = useNavigate();

  // Categoría inicial
  const [categoria, setCategoria] = useState("ENTRADAS");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  // LISTA DE PRODUCTOS
  const entradas = [
    { nombre: "BRUSCHETTA", img: "https://via.placeholder.com/150" },
    { nombre: "ENSALADA", img: "https://via.placeholder.com/150" },
  ];

  const pizzas = [
    { nombre: "PEPPERONI", img: "https://i.imgur.com/Y82MzfY.png" },
    { nombre: "MARGHERITA", img: "https://i.imgur.com/EcUXGte.png" },
    { nombre: "MARINARA", img: "https://i.imgur.com/N8OBiG9.png" },
    { nombre: "CUATRO QUESOS", img: "https://i.imgur.com/Dz0Rj9X.png" },
    { nombre: "HAWAIANA", img: "https://i.imgur.com/s2brY20.png" },
    { nombre: "FOCACCIA", img: "https://i.imgur.com/LAFuRZO.png" },
    { nombre: "AL TAGLIO", img: "https://i.imgur.com/4m5QkSe.png" },
    { nombre: "PINSA", img: "https://i.imgur.com/Xc3sT9J.png" },
  ];

  const bebidas = [
    { nombre: "COCA COLA", img: "https://via.placeholder.com/150" },
    { nombre: "JUGO", img: "https://via.placeholder.com/150" },
  ];

  const raciones = [
    { nombre: "PAPAS FRITAS", img: "https://via.placeholder.com/150" },
    { nombre: "ALITAS", img: "https://via.placeholder.com/150" },
  ];

  const data = {
    ENTRADAS: entradas,
    PIZZAS: pizzas,
    BEBIDAS: bebidas,
    RACIONES: raciones,
  };

  const handleGuardar = () => {
    if (!productoSeleccionado) return alert("Seleccione un producto");
    if (cantidad <= 0) return alert("Cantidad inválida");

    alert(
      `✔ Guardado:\nProducto: ${productoSeleccionado.nombre}\nCantidad: ${cantidad}`
    );

    setProductoSeleccionado(null);
    setCantidad(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f6d9a6] p-10">

      {/* REGRESAR */}
      <button
        onClick={() => navigate("/mesero/mesas")}
        className="absolute top-6 left-6 bg-[#f4d78a] px-6 py-2 rounded-full shadow font-bold"
      >
        ⬅ REGRESAR
      </button>

      {/* TÍTULO */}
      <h1 className="text-center text-2xl font-bold text-white tracking-widest mb-10">
        CANTIDAD DE PRODUCTOS DISPONIBLES
      </h1>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-8">
        {["ENTRADAS", "PIZZAS", "BEBIDAS", "RACIONES"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategoria(cat);
              setProductoSeleccionado(null);
            }}
            className={`
              px-10 py-3 rounded-xl font-bold
              ${categoria === cat
                ? "bg-[#f5e9c5] border-b-4 border-[#c5b37c]"
                : "bg-[#f5e9c5]/70 hover:bg-[#f5e9c5]"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="bg-[#f5e9c5] p-10 mx-auto rounded-3xl shadow-2xl max-w-5xl">
        <div className="grid grid-cols-4 gap-8 place-items-center">

          {data[categoria].map((prod, index) => (
            <div
              key={index}
              onClick={() => setProductoSeleccionado(prod)}
              className={`
                text-center p-3 rounded-xl cursor-pointer transition-all
                ${productoSeleccionado?.nombre === prod.nombre
                  ? "bg-[#ffe9b0] scale-105"
                  : "hover:scale-105 bg-[#fff5d6]"
              }`}
            >
              <img
                src={prod.img}
                className="w-32 h-32 rounded-lg shadow object-cover"
              />
              <p className="mt-3 font-bold text-[#444] tracking-wide">
                {prod.nombre}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* ABAJO */}
      <div className="flex justify-center gap-6 mt-10">
        <div className="flex items-center gap-2">
          <span className="text-[#444] font-bold">CANTIDAD A REGISTRAR</span>
          <input
            type="number"
            className="w-16 text-center p-2 bg-[#f5e9c5] rounded-xl shadow"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
          />
        </div>

        <button
          onClick={handleGuardar}
          className="bg-[#c8a54f] hover:bg-[#b89545] px-6 py-3 rounded-xl font-bold shadow-lg"
        >
          GUARDAR 📝
        </button>

        <button
          onClick={() => {
            setCantidad(0);
            setProductoSeleccionado(null);
          }}
          className="bg-[#d8342c] hover:bg-[#b02a23] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          LIMPIAR REGISTRO 🗑
        </button>
      </div>

    </div>
  );
};

export default Productos;

