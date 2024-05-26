import { ParamsProps } from "@types/types";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: ParamsProps }
) {
  try {
    // Obtener el ID de los parámetros de la solicitud
    const getId = params.id;

    // Verificar si el ID está presente
    if (!getId) {
      throw new Error("ID is required");
    }

    // const apiRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/${getId}`
    // );
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/${getId}`
    );

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
    }

    // Convertir la respuesta a JSON
    const data = await apiRes.json();

    // Configurar encabezados para deshabilitar el cache
    // const headers = new Headers({
    //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    //   Pragma: "no-cache",
    //   Expires: "0",
    // });

    // // Enviar las mascotas como respuesta
    // return new NextResponse(JSON.stringify({ data }), {
    //   status: 200,
    //   headers,
    // });

    // Enviar las mascotas como respuesta
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
  }
}
