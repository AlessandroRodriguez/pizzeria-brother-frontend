// src/pages/Home.jsx

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="bg-gradient-to-b from-[#d8342c] to-[#f9d7a0] min-h-screen flex items-center justify-center px-4">

      <div className="bg-[#fff3d6] p-10 rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col md:flex-row gap-10 items-center">

        <div className="p-4 bg-[#f9efd7] rounded-3xl shadow-lg">
          <img 
            src="https://i.postimg.cc/0J5mdk9/pizzaaaaaaaaaaaaaaaa.png"
            className="w-40 md:w-56 rounded-xl"
            alt="Pizza Brothers Logo"
          />
        </div>

        <div className="flex flex-col w-full md:w-[350px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#f3d7a6] drop-shadow-[2px_3px_0px_#8b3c2f] leading-tight mb-10 text-center md:text-left">
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


