import { Animal } from "@types/types";
import { QueryFunction } from "react-query";

const fetchPet : QueryFunction <Animal,  ["pet", string]> = async ({
  queryKey
}) => {

  try {
    const id = queryKey[1];
  
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/${id}`);
  
    if (!apiRes.ok) {
      throw new Error(`pet/${id} fetch not ok`);
    }
  
    return apiRes.json();

  } catch (error) {
    throw new Error("Error en fetchPet:", error);
  }

  };
  
  export default fetchPet;