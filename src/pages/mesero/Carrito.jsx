import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Carrito = () => {
  const navigate = useNavigate();
  const {
    carrito,
    agregarProducto,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    total,
    mesaSeleccionada
  } = useCart();

  // 🔥 Si entran sin mesa → regresar
  if (!mesaSeleccionada) {
    navigate("/mesero/mesas");
    return null;
  }

  // ----------------------------------------------------
  // 🚀 ENVIAR PEDIDO A BACKEND
  // ----------------------------------------------------
  const enviarPedido = async () => {
    if (carrito.length === 0) {
      alert("El pedido está vacío.");
      return;
    }

    const pedido = {
      mesaId: mesaSeleccionada,
      items: carrito.map((p) => ({
        productoId: p.id,
        nombre: p.nombre,
        cantidad: p.cantidad,
        precioUnitario: p.precio,
      })),
    };

    try {
      // 1️⃣ Enviar pedido
      await axios.post("http://localhost:8085/api/pedidos", pedido);

      // 2️⃣ Cambiar mesa a OCUPADA
      await axios.put(
        `http://localhost:8085/api/mesas/${mesaSeleccionada}/estado?estado=OCUPADA`
      );

      // 3️⃣ Vaciar carrito
      vaciarCarrito();

      // 4️⃣ Volver a mesas
      alert("Pedido enviado correctamente 🚀");
      navigate("/mesero/mesas");

    } catch (e) {
      console.error("Error enviando pedido:", e);
      alert("Hubo un error al enviar el pedido.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8342c] to-[#f6d9a6] p-10">

      {/* 🔙 REGRESAR */}
      <button
        onClick={() => navigate("/mesero/productos")}
        className="absolute top-6 left-6 bg-[#f4d78a] px-6 py-2 rounded-full shadow font-bold"
      >
        ⬅ VOLVER
      </button>

      {/* TÍTULO */}
      <h1 className="text-center text-3xl font-bold text-white tracking-widest mb-10">
        🧾 CARRITO — MESA {String(mesaSeleccionada?.numero ?? mesaSeleccionada).padStart(2, "0")}
      </h1>

      {/* CONTENEDOR */}
      <div className="bg-[#fff3d6] p-10 mx-auto max-w-4xl rounded-3xl shadow-2xl">

        {/* LISTA */}
        {carrito.length === 0 ? (
          <p className="text-center text-lg font-bold text-gray-600">
            El carrito está vacío.
          </p>
        ) : (
          <div className="flex flex-col gap-4">

            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#fdf1ca] p-4 rounded-xl shadow"
              >
                {/* Nombre */}
                <span className="text-lg font-bold text-[#444] w-40">
                  {item.nombre}
                </span>

                {/* Cantidad */}
                <div className="flex items-center gap-6">

                  {/* 🔻 RESTAR */}
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => disminuirCantidad(item.id)}
                  >
                    −
                  </button>

                  <span className="font-bold w-6 text-center">{item.cantidad}</span>

                  {/* 🔺 SUMAR */}
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => agregarProducto(item, 1)}
                  >
                    +
                  </button>

                  {/* ❌ ELIMINAR (ROJO, SEPARADO) */}
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg ml-3"
                    onClick={() => {
                      if (confirm("¿Eliminar este producto del carrito?")) {
                        eliminarProducto(item.id);
                      }
                    }}
                  >
                    X
                  </button>

                </div>

                {/* Subtotal */}
                <span className="font-bold text-lg text-[#222]">
                  S/ {(item.cantidad * item.precio).toFixed(2)}
                </span>
              </div>
            ))}

          </div>
        )}

        {/* TOTAL */}
        <div className="text-right mt-8 pr-4">
          <h2 className="text-2xl font-extrabold text-[#333]">
            TOTAL: <span className="text-[#b8860b]">S/ {total.toFixed(2)}</span>
          </h2>
        </div>

        {/* BOTÓN ENVIAR */}
        <div className="flex justify-center mt-10">
          <button
            onClick={enviarPedido}
            className="bg-[#c8a54f] hover:bg-[#b89545] text-white font-bold px-10 py-4 rounded-2xl shadow-xl text-xl"
          >
            ENVIAR A COCINA 🚀
          </button>
        </div>

      </div>
    </div>
  );
};

export default Carrito;
