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

const fetchAllPets: QueryFunction<PetsAPIResponse, ["pets", { breed?: string; especie?: string; age_min?: number, age_max?: number }]> = async ({ queryKey }) => {
  const [key, filters] = queryKey;

  try {
    console.log("Filters:", filters);
    const apiRes = await fetch(`/api/list_all_pets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
      body: JSON.stringify(filters),
    });

    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas: ${apiRes.statusText}`);
    }

    const data = await apiRes.json();

    return data.data;

  } catch (error) {
    console.error("Error en fetchPets:", error);
    throw error;
  }
};

export default fetchAllPets;
