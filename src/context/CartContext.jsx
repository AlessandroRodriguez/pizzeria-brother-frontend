// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [carrito, setCarrito] = useState([]);

  // Selección de mesa
  const seleccionarMesa = (mesa) => {
    setMesaSeleccionada(mesa);
    setCarrito([]); 
  };

  // 🔥 Agregar con cantidad REAL
  const agregarProducto = (producto, cantidad = 1) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad }]);
    }
  };

  // ⬇ Disminuir cantidad (sin eliminar directo)
  const disminuirCantidad = (id) => {
    const item = carrito.find((p) => p.id === id);
    if (!item) return;

    if (item.cantidad > 1) {
      setCarrito(
        carrito.map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
      );
    } else {
      // Confirma si desea eliminar
      if (confirm("¿Deseas eliminar este producto del carrito?")) {
        eliminarProducto(id);
      }
    }
  };

  // ❌ Eliminar por completo
  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        mesaSeleccionada,
        seleccionarMesa,

        carrito,
        agregarProducto,
        disminuirCantidad,
        eliminarProducto,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

