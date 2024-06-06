/**
 * @file route.ts
 * @version 1.0.0
 * @description Este archivo se encarga de realizar la petición para obtener a todas las mascotas.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 19 de abril del 2024
 */

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Obtiene el cuerpo de la solicitud
    const { breed, especie, age_min, age_max } = await req.json();

    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ breed, especie, age_min, age_max }),
    });

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
    }

    // Convertir la respuesta a JSON
    const data = await apiRes.json();

    // Configurar encabezados para deshabilitar el cache
    const headers = new Headers({
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    });

    // Enviar las mascotas como respuesta
    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
      headers,
    });


  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
      }
    );
  }
}



