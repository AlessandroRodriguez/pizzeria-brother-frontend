import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-gradient-to-b from-[#d8342c] to-[#f9d7a0] min-h-screen flex items-center justify-center">

      <div className="bg-[#fff3d6] p-16 rounded-3xl shadow-2xl flex gap-20 items-center">

        <div className="p-5 bg-[#f9efd7] rounded-3xl shadow-lg">
          <img 
            src="https://i.imgur.com/UXQYu7C.png"
            className="w-64 rounded-xl"
          />
        </div>

        <div className="flex flex-col w-[350px]">
          <h1 className="text-5xl font-extrabold text-[#f3d7a6] drop-shadow-[2px_3px_0px_#8b3c2f] leading-tight mb-10">
            BIENVENIDO A <br/> PIZZA BROTHERS
          </h1>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#487a47] text-white w-full py-3 rounded-full font-bold hover:bg-[#3b663b] transition shadow-md"
          >
            INICIAR SESIÓN
          </button>

          <button 
            className="bg-[#e8c368] text-black w-full py-3 rounded-full mt-4 font-bold hover:bg-[#d8b257] transition shadow-md"
          >
            REGISTRARSE
          </button>
        </div>
      </div>

    </main>
  );
};

export default Home;

