// src/context/CartContext.jsx

import { createContext, useContext, useState } from "react";

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 🟡 Mesa seleccionada por el mesero
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  // 🛒 Carrito del pedido
  const [carrito, setCarrito] = useState([]);

  // ✔ Seleccionar mesa (se usa en /mesero/mesas)
  const seleccionarMesa = (mesa) => {
    setMesaSeleccionada(mesa);
    setCarrito([]); // siempre iniciar carrito vacío para esa mesa
  };

  // ➕ Agregar producto
  const agregarProducto = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      setCarrito(
        carrito.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // ❌ Eliminar producto
  const eliminarProducto = (id) => {
    setCarrito(carrito.filter((p) => p.id !== id));
  };

  // 🧼 Vaciar carrito (se usa después de enviar el pedido)
  const vaciarCarrito = () => setCarrito([]);

  // 💲 Calcular total automáticamente
  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        // mesa
        mesaSeleccionada,
        seleccionarMesa,

        // carrito
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
