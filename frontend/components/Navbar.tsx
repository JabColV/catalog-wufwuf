"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "./CustomImage";
import axios from "axios";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get("/api/user")
        .then((res) => {
          const userData = res.data;
          //Verifica si es admin
          if (userData.role !== "member") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((err) => {});
    };
    fetchUser();
  }, []);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-olivine-400">
      <div className="flex items-center space-x-2">
        <CustomImage
          src="/assets/logo.jpeg"
          className="w-14 h-14 flex items-center justify-center"
          alt="wufwuf logo"
          width={70}
          height={45}
        />
        <h1 className="text-5xl text-white font-bold pl-8">WufWuf</h1>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Link
          href="/service-users"
          className="h-8 w-14 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600"
        >
          Inicio
        </Link>

        <Link
          href="/service-pets/catalogo"
          className="h-8 w-16 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600"
        >
          Catálogo
        </Link>

        {isAdmin && (
          <Link
            href="/service-pets/lista_mascotas"
            className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-transparent hover:border-olivine-600"
          >
            Gestionar mascotas
          </Link>
        )}
        {isAdmin && (
          <Link
            href="/service-dates/admin"
            className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-transparent hover:border-olivine-600"
          >
            Editar citas
          </Link>
        )}

        <Link
          href="/service-users/register"
          className="h-8 w-16 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600"
        >
          Register
        </Link>

        <Link
          href="/service-users/login"
          className="h-8 w-14 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
