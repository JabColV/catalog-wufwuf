import { ParamsProps } from "@types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }: { params: ParamsProps }) {
  try {
    const getId = params.id;
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/${getId}/toggle_adoption/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    // const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/crear/`, {
    //   method: "POST",
    //   body: JSON.stringify(req.body),
    // });

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas/crear: ${apiRes.statusText}`);
    }

    const data = await apiRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error al crear la mascota:", error);
    // return res.status(500).json({ error: "Error interno del servidor" });
  }
}

