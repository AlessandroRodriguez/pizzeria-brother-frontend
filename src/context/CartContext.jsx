// src/context/CartContext.jsx

import { createContext, useContext, useState } from "react";

// CONTEXTO
const CartContext = createContext();

// HOOK PARA USAR EL CARRITO
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // ➕ Agregar producto
  const agregarProducto = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);

    if (existe) {
      // si ya existe, suma 1 a la cantidad
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

  // 🧼 Vaciar carrito
  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
