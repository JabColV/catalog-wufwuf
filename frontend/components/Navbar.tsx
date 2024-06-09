"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomImage from "./CustomImage";
import { useQuery } from "react-query";
import fetchUser from "@api/get_user";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { data, error, isLoading } = useQuery("fetchUser", fetchUser);

  useEffect(() => {
	if (!data) return;
	//Verifica si es admin
	if (data.role !== "member") {
		setIsAdmin(true);
	} else {
		setIsAdmin(false);
	}
  }, [data]);

  return (
	<header className="flex flex-row justify-between w-screen h-20 bg-olivine-400">
      <div className="flex flex-row items-center justify-center">
        <Link className="pl-4" href="/service-users/">
		<CustomImage
          src="/assets/egg.png"
          className="w-14 h-14 flex items-center justify-center"
          alt="wufwuf logo"
          width={70}
          height={45}
        />
          <span className="sr-only">Wuf wuf Icono</span>
        </Link>
        <h1 className="text-5xl text-white font-bold pl-8">Wuf Wuf</h1>
      </div>
      <div className="flex flex-row items-center justify-center">
        {isAdmin &&
          <Link href="/service-users/users-panel" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
            Editar usuarios
          </Link>
        }
        {isAdmin &&
          <Link href="/service-pets/lista_mascotas" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
            Editar mascotas
          </Link>
        }
        {isAdmin &&
          <Link href="/service-dates/admin" className="mx-4 h-8 w-18 hover:text-[#ddd] flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
            Editar citas
          </Link>
        }
        <Link href="/service-users/register" className="mx-4 h-8 w-16 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
          Register
        </Link>

        <Link href="/service-users/login" className="mx-4 h-8 w-14 hover:text-[#ddd] flex items-center justify-center text-white font-semibold  border-b-4 border-transparent hover:border-olivine-600">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
