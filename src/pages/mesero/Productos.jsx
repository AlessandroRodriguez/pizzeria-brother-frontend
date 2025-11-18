import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

// 🟡 Entradas
import palitos from "../../assets/entradas/palitos_de_queso.png";
import ensalada from "../../assets/entradas/ensalada.png";
import panAlAjo from "../../assets/entradas/pan_al_ajo.png";
import sopa from "../../assets/entradas/sopa.png";
import tartaros from "../../assets/entradas/tartaros.png";
import mozzarella from "../../assets/entradas/mozzarella.png";
import alitas from "../../assets/entradas/alitas_de_pollo.png";
import papas from "../../assets/entradas/papas_fritas.png";

// 🟡 Pizzas
import pepperoni from "../../assets/pizzas/pepperoni.png";
import margherita from "../../assets/pizzas/margherita.png";
import marinara from "../../assets/pizzas/marinara.png";
import cuatroQuesos from "../../assets/pizzas/cuatro_quesos.png";
import hawaiana from "../../assets/pizzas/hawaiana.png";
import focaccia from "../../assets/pizzas/focaccia.png";
import alTaglio from "../../assets/pizzas/al_taglio.png";
import pinsa from "../../assets/pizzas/pinsa.png";

// 🥤 Bebidas
import coca from "../../assets/bebidas/coca_cola.png";
import inka from "../../assets/bebidas/inka_cola.png";
import sprite from "../../assets/bebidas/sprite.png";
import fanta from "../../assets/bebidas/fanta.png";
import jugoNaranja from "../../assets/bebidas/jugo_naranja.png";
import jugoPina from "../../assets/bebidas/jugo_pina.png";

const Productos = () => {
  const navigate = useNavigate();
  const { mesaSeleccionada, agregarProducto } = useCart();

  const [categoria, setCategoria] = useState("ENTRADAS");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // 🎯 Evitar entrar sin mesa
  useEffect(() => {
    if (!mesaSeleccionada) {
      alert("Selecciona una mesa primero");
      navigate("/mesero/mesas");
    }
  }, []);

  // 🟡 Entradas
  const entradas = [
    { id: 1, nombre: "PALITOS DE QUESO", img: palitos, precio: 10 },
    { id: 2, nombre: "ENSALADAS", img: ensalada, precio: 12 },
    { id: 3, nombre: "PAN AL AJO", img: panAlAjo, precio: 8 },
    { id: 4, nombre: "SOPA", img: sopa, precio: 9 },
    { id: 5, nombre: "TÁRTAROS", img: tartaros, precio: 14 },
    { id: 6, nombre: "MOZARELLA", img: mozzarella, precio: 13 },
    { id: 7, nombre: "ALITAS DE POLLO", img: alitas, precio: 15 },
    { id: 8, nombre: "PAPAS FRITAS", img: papas, precio: 7 },
  ];

  // 🟡 Pizzas
  const pizzas = [
    { id: 9, nombre: "PEPPERONI", img: pepperoni, precio: 30 },
    { id: 10, nombre: "MARGHERITA", img: margherita, precio: 28 },
    { id: 11, nombre: "MARINARA", img: marinara, precio: 26 },
    { id: 12, nombre: "CUATRO QUESOS", img: cuatroQuesos, precio: 32 },
    { id: 13, nombre: "HAWAIANA", img: hawaiana, precio: 29 },
    { id: 14, nombre: "FOCACCIA", img: focaccia, precio: 25 },
    { id: 15, nombre: "AL TAGLIO", img: alTaglio, precio: 33 },
    { id: 16, nombre: "PINSA", img: pinsa, precio: 31 },
  ];

  // 🟡 Bebidas
  const bebidas = [
    { id: 17, nombre: "COCA COLA", img: coca, precio: 5 },
    { id: 18, nombre: "INKA COLA", img: inka, precio: 5 },
    { id: 19, nombre: "SPRITE", img: sprite, precio: 5 },
    { id: 20, nombre: "FANTA", img: fanta, precio: 5 },
    { id: 21, nombre: "JUGO DE NARANJA", img: jugoNaranja, precio: 7 },
    { id: 22, nombre: "JUGO DE PIÑA", img: jugoPina, precio: 7 },
  ];

  // 🟡 RACIONES
  const raciones = [
    { id: 23, nombre: "PAPAS FRITAS RACIÓN", img: papas, precio: 10 },
    { id: 24, nombre: "ALITAS RACIÓN", img: alitas, precio: 18 },
  ];

  const data = {
    ENTRADAS: entradas,
    PIZZAS: pizzas,
    BEBIDAS: bebidas,
    RACIONES: raciones,
  };

  // 🟩 Agregar al carrito con cantidad real
  const handleGuardar = () => {
    if (!productoSeleccionado) {
      alert("Selecciona un producto");
      return;
    }

    if (cantidad < 1) {
      alert("Cantidad inválida");
      return;
    }

    agregarProducto(productoSeleccionado, cantidad);

    alert(`✔ Agregado: ${productoSeleccionado.nombre} (x${cantidad})`);
    setProductoSeleccionado(null);
    setCantidad(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f6d9a6] p-10">

      <button
        onClick={() => navigate("/mesero/mesas")}
        className="absolute top-6 left-6 bg-[#f4d78a] px-6 py-2 rounded-full shadow font-bold"
      >
        ⬅ REGRESAR
      </button>

      {/* ✔ TITULO CORREGIDO */}
      <h1 className="text-center text-3xl font-bold text-white tracking-widest mb-10">
        PRODUCTOS — MESA {String(mesaSeleccionada?.numero ?? mesaSeleccionada).padStart(2, "0")}
      </h1>

      {/* TABS */}
      <div className="flex justify-center gap-4 mb-8">
        {["ENTRADAS", "PIZZAS", "BEBIDAS", "RACIONES"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-10 py-3 rounded-xl font-bold ${
              categoria === cat
                ? "bg-[#f5e9c5] border-b-4 border-[#c5b37c]"
                : "bg-[#f5e9c5]/70 hover:bg-[#f5e9c5]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTOS */}
      <div className="bg-[#f5e9c5] p-10 mx-auto rounded-3xl shadow-2xl max-w-5xl">
        <div className="grid grid-cols-4 gap-8 place-items-center">
          {data[categoria].map((prod) => (
            <div
              key={prod.id}
              onClick={() => setProductoSeleccionado(prod)}
              className={`text-center p-3 rounded-xl cursor-pointer transition-all ${
                productoSeleccionado?.id === prod.id
                  ? "bg-[#ffe9b0] scale-105"
                  : "hover:scale-105 bg-[#fff5d6]"
              }`}
            >
              <div className="w-24 h-24 bg-[#fff5d6] rounded-xl flex items-center justify-center overflow-hidden shadow">
                <img src={prod.img} className="h-full w-full object-contain" />
              </div>

              <p className="mt-3 font-bold text-[#444] tracking-wide">
                {prod.nombre}
              </p>
              <p className="text-gray-600 text-sm">S/ {prod.precio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTROLES */}
      <div className="flex justify-center gap-6 mt-10">
        <div className="flex items-center gap-2">
          <span className="text-[#444] font-bold">CANTIDAD</span>
          <input
            type="number"
            className="w-16 text-center p-2 bg-[#f5e9c5] rounded-xl shadow"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            min={1}
          />
        </div>

        <button
          onClick={handleGuardar}
          className="bg-[#c8a54f] hover:bg-[#b89545] px-6 py-3 rounded-xl font-bold shadow-lg"
        >
          AGREGAR 📝
        </button>

        <button
          onClick={() => {
            setCantidad(1);
            setProductoSeleccionado(null);
          }}
          className="bg-[#d8342c] hover:bg-[#b02a23] text-white px-6 py-3 rounded-xl shadow-lg"
        >
          LIMPIAR 🗑
        </button>

        <button
          onClick={() => navigate("/mesero/carrito")}
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl shadow-lg font-bold"
        >
          🧾 VER CARRITO
        </button>
      </div>

    </div>
  );
};

export default Productos;
