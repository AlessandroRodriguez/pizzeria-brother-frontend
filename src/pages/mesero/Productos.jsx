// src/pages/mesero/Productos.jsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// 🟡 Importamos imágenes locales (entradas)
import palitos from "../../assets/entradas/palitos_de_queso.png";
import ensalada from "../../assets/entradas/ensalada.png";
import panAlAjo from "../../assets/entradas/pan_al_ajo.png";
import sopa from "../../assets/entradas/sopa.png";
import tartaros from "../../assets/entradas/tartaros.png";
import mozzarella from "../../assets/entradas/mozzarella.png";
import alitas from "../../assets/entradas/alitas_de_pollo.png";
import papas from "../../assets/entradas/papas_fritas.png";

// 🟡 Importamos imágenes locales (pizzas)
import pepperoni from "../../assets/pizzas/pepperoni.png";
import margherita from "../../assets/pizzas/margherita.png";
import marinara from "../../assets/pizzas/marinara.png";
import cuatroQuesos from "../../assets/pizzas/cuatro_quesos.png";
import hawaiana from "../../assets/pizzas/hawaiana.png";
import focaccia from "../../assets/pizzas/focaccia.png";
import alTaglio from "../../assets/pizzas/al_taglio.png";
import pinsa from "../../assets/pizzas/pinsa.png";

// 🥤 Importamos imágenes locales (bebidas)
import coca from "../../assets/bebidas/coca_cola.png";
import inka from "../../assets/bebidas/inka_cola.png";
import sprite from "../../assets/bebidas/sprite.png";
import fanta from "../../assets/bebidas/fanta.png";
import jugoNaranja from "../../assets/bebidas/jugo_naranja.png";
import jugoPina from "../../assets/bebidas/jugo_pina.png";

const Productos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 🟢 Mesa enviada desde Mesas.jsx
  const mesaId = location.state?.mesa;

  const [categoria, setCategoria] = useState("ENTRADAS");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  // ⚠ Para saber si se creó pedido o no
  const [pedidoCreado, setPedidoCreado] = useState(false);

  // 🟡 LIBERAR MESA SI EL MESERO SALE SIN GUARDAR NADA
  useEffect(() => {
    return () => {
      if (!pedidoCreado) {
        axios.put(`http://localhost:8085/api/mesas/${mesaId}/liberar`);
      }
    };
  }, [pedidoCreado, mesaId]);

  // 🟡 LISTA DE PRODUCTOS – ENTRADAS
  const entradas = [
    { nombre: "PALITOS DE QUESO", img: palitos },
    { nombre: "ENSALADAS", img: ensalada },
    { nombre: "PAN AL AJO", img: panAlAjo },
    { nombre: "SOPA", img: sopa },
    { nombre: "TÁRTAROS", img: tartaros },
    { nombre: "MOZARELLA", img: mozzarella },
    { nombre: "ALITAS DE POLLO", img: alitas },
    { nombre: "PAPAS FRITAS", img: papas },
  ];

  // 🟡 PIZZAS
  const pizzas = [
    { nombre: "PEPPERONI", img: pepperoni },
    { nombre: "MARGHERITA", img: margherita },
    { nombre: "MARINARA", img: marinara },
    { nombre: "CUATRO QUESOS", img: cuatroQuesos },
    { nombre: "HAWAIANA", img: hawaiana },
    { nombre: "FOCACCIA", img: focaccia },
    { nombre: "AL TAGLIO", img: alTaglio },
    { nombre: "PINSA", img: pinsa },
  ];

  // 🥤 BEBIDAS
  const bebidas = [
    { nombre: "COCA COLA", img: coca },
    { nombre: "INKA COLA", img: inka },
    { nombre: "SPRITE", img: sprite },
    { nombre: "FANTA", img: fanta },
    { nombre: "JUGO DE NARANJA", img: jugoNaranja },
    { nombre: "JUGO DE PIÑA", img: jugoPina },
  ];

  // 🍗 RACIONES
  const raciones = [
    { nombre: "PAPAS FRITAS", img: papas },
    { nombre: "ALITAS DE POLLO", img: alitas },
  ];

  const data = {
    ENTRADAS: entradas,
    PIZZAS: pizzas,
    BEBIDAS: bebidas,
    RACIONES: raciones,
  };

  // 🟩 GUARDAR PRODUCTO
  const handleGuardar = () => {
    if (!productoSeleccionado) return alert("Seleccione un producto");
    if (cantidad <= 0) return alert("Cantidad inválida");

    setPedidoCreado(true);

    alert(`✔ Guardado:\nProducto: ${productoSeleccionado.nombre}\nCantidad: ${cantidad}`);

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
        PRODUCTOS (Mesa {mesaId})
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
              ${
                categoria === cat
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
                ${
                  productoSeleccionado?.nombre === prod.nombre
                    ? "bg-[#ffe9b0] scale-105"
                    : "hover:scale-105 bg-[#fff5d6]"
                }
              `}
            >

              {/* 🔥 CONTENEDOR UNIFORME PARA TODAS LAS IMÁGENES */}
              <div className="w-24 h-24 bg-[#fff5d6] rounded-xl flex items-center justify-center overflow-hidden shadow">
                <img
                  src={prod.img}
                  className="h-full w-full object-contain"
                />
              </div>

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
          REGISTRAR 📝
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
