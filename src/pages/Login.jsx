// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  // 🔥 Usuarios reales de tu tabla MySQL
  const usuariosDB = [
    { usuario: "mesero1", clave: "1234", rol: "MESERO" },
    { usuario: "cajero1", clave: "1234", rol: "CAJERO" },
    { usuario: "cocina1", clave: "1234", rol: "COCINA" },
    { usuario: "gerente1", clave: "1234", rol: "GERENTE" },
  ];

  const handleLogin = () => {
    // Buscar usuario en la lista
    const user = usuariosDB.find(
      (u) => u.usuario === usuario && u.clave === clave
    );

    if (!user) {
      alert("❌ Usuario o contraseña incorrectos");
      return;
    }

    // 🔥 Redirección según el ROL
    switch (user.rol) {
      case "MESERO":
        navigate("/mesero/mesas");
        break;

      case "CAJERO":
        navigate("/caja/pago");
        break;

      case "COCINA":
        navigate("/cocina");
        break;

      case "GERENTE":
        navigate("/gerente");
        break;

      default:
        alert("❌ Rol no reconocido");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#d8342c] to-[#f6d9a6]">

      {/* CONTENEDOR PRINCIPAL */}
      <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl flex items-center gap-16">

        {/* LOGO */}
        <div>
          <img
            src="https://i.imgur.com/5oQKQp0.png"
            alt="pizza logo"
            className="w-60 rounded-3xl shadow-lg"
          />
        </div>

        {/* FORMULARIO */}
        <div className="flex flex-col w-80">

          <h1 className="text-3xl font-extrabold text-[#d8342c] text-center mb-8 leading-tight tracking-wide">
            BIENVENIDO A <br />
            PIZZA BROTHERS 🍕
          </h1>

          {/* USUARIO */}
          <input
            type="text"
            placeholder="👤 Usuario"
            className="w-full mb-4 p-3 bg-white rounded-xl shadow-md border border-gray-300 outline-none"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          {/* CONTRASEÑA */}
          <input
            type="password"
            placeholder="🔒 Contraseña"
            className="w-full mb-6 p-3 bg-white rounded-xl shadow-md border border-gray-300 outline-none"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />

          {/* BOTÓN LOGIN */}
          <button
            className="w-full py-3 bg-[#2c5e1a] hover:bg-[#1f4312] text-white font-bold rounded-xl shadow-lg transition-all"
            onClick={handleLogin}
          >
            INICIAR SESIÓN
          </button>

          {/* BOTÓN REGISTRO */}
          <button
            className="w-full mt-3 py-3 bg-[#d8342c] hover:bg-[#b02a23] text-white font-bold rounded-xl shadow-lg transition-all"
          >
            REGISTRARSE
          </button>

          {/* BOTÓN AYUDA */}
          <button className="mt-6 mx-auto bg-[#d8342c] hover:bg-[#b02a23] text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm">
            AYUDA ❓
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
