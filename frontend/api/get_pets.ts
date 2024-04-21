/**
 * @file fetch_pets.ts
 * @version 1.0.0
 * @description Este archivo se encarga de realizar la petición para obtener a todas las mascotas.
 * @author Nicol Ortiz
 * @contact nicol.ortiz@correounivalle.edu.co
 * @date 19 de abril del 2024
 */

import { QueryFunction } from "react-query";
import { PetsAPIResponse } from "@types/types";

/**
 * @async
 * @function fetchPets
 * @param {void}
 * @returns {Promise<PetsAPIResponse>}
 * @description Esta función se encarga de realizar la petición para obtener a todas las mascotas.
 */

const fetchPets: QueryFunction<PetsAPIResponse, ["pets"]> = async () => {
  try {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/`
    );

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
    }

    return apiRes.json();
  } catch (error) {
    console.error("Error en fetchPets:", error);
    throw error;
  }
};

export default fetchPets;
