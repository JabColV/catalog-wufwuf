import React from "react";
import Link from "next/link";
import CustomImage from "./CustomImage";

const Navbar = () => {
	return (
		<header className="px-4 lg:px-6 h-14 flex items-center bg-olivine-400">
			<CustomImage src="/assets/logo.jpeg" className="w-14 h-14 flex items-center justify-center" alt="wufwuf logo" width={70} height={45} />
			<div className="ml-auto flex items-center space-x-4">
				<Link href="/service-users" className="h-8 w-14 flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
					Inicio
				</Link>

				<Link href="/service-pets/catalogo" className="h-8 w-16 flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
					Catálogo
				</Link>

				<Link href="/service-users/register" className="h-8 w-16 flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
					Register
				</Link>

				<Link href="/service-users/login" className="h-8 w-14 flex items-center justify-center text-white font-semibold border-b-4 border-transparent hover:border-olivine-600">
					Login
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
