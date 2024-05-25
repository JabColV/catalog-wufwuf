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
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/`
    );
    // const apiRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/`
    // );

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
    }

    // Convertir la respuesta a JSON
    const data = await apiRes.json();

    // Enviar las mascotas como respuesta
    return Response.json({data});

  } catch (error) {
    console.error("Error al obtener las mascotas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

