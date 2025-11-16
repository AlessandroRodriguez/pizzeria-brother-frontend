import { useCart } from "../../context/CartContext";

const Pizzas = () => {
  const { agregarProducto } = useCart();

  const pizzas = [
    { id: 1, nombre: "Americana", precio: 25 },
    { id: 2, nombre: "Hawaiana", precio: 27 },
  ];

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Pizzas</h1>

      {pizzas.map((p) => (
        <div key={p.id} className="bg-white p-6 rounded-xl shadow-md mb-4">
          <h2 className="text-xl">{p.nombre}</h2>
          <p className="text-gray-500">S/ {p.precio}</p>

          <button
            onClick={() => agregarProducto(p)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            ➕ Agregar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Pizzas;

