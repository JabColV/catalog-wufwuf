// /**
//  * @file route.ts
//  * @version 1.0.0
//  * @description Este archivo se encarga de realizar la petición para obtener a todas las mascotas.
//  * @author Nicol Ortiz
//  * @contact nicol.ortiz@correounivalle.edu.co
//  * @date 19 de abril del 2024
//  */

// import type { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server";

// export async function GET(req, res) {
//   try {
//     // Extraer los parámetros de la solicitud
//     console.log("Oeee:", req.query);
//     const { breed, especie, etapa } = req.query;

//     // Construir la URL de la API con los filtros
//     const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/`);
//     if (breed) url.searchParams.append('breed', breed as string);
//     if (especie) url.searchParams.append('especie', especie as string);
//     if (etapa) url.searchParams.append('etapa', etapa as string);

//     console.log("URL:", url.toString());

//     // Realizar la petición a la API
//     const apiRes = await fetch(url.toString(), {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "no-cache",
//         Pragma: "no-cache",
//         Expires: "0",
//       },
//     });

//     if (!apiRes.ok) {
//       throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
//     }

//     // Convertir la respuesta a JSON
//     const data = await apiRes.json();

//     // Configurar encabezados para deshabilitar el cache
//     const headers = new Headers({
//       "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//       Pragma: "no-cache",
//       Expires: "0",
//     });

//     // Enviar las mascotas como respuesta
//     return new NextResponse(JSON.stringify({ data }), {
//       status: 200,
//       headers,
//     });
//   } catch (error) {
//     console.error("Error al obtener las mascotas:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Error interno del servidor" }),
//       {
//         status: 500,
//       }
//     );
//   }
// }





/**
 * @file route.ts
 * @version 1.0.0
 * @description Este archivo se encarga de realizar la petición para obtener a todas las mascotas.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 19 de abril del 2024
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Realizar la petición a la API
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    // const apiRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Cache-Control": "no-cache",
    //       Pragma: "no-cache",
    //       Expires: "0"
    //     }
    //   }
    // );

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

    // Enviar las mascotas como respuesta
    // res.status(200).json({ data });
    // return NextResponse.json({ data });
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



