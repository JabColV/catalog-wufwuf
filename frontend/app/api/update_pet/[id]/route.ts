import { ParamsProps } from "@types/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function PUT(req, { params }: { params: ParamsProps }) {
  try {
    const getId = params.id;
    const body = await req.json();
    // const apiRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/${getId}/actualizar/`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(body),
    //   }
    // );
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ISOLATED_URL_KUBERNETES}/api/mascotas/${getId}/actualizar/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

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
