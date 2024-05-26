import { Animal } from "@types/types";
import { QueryFunction } from "react-query";

const fetchPet: QueryFunction<Animal, ["pet", string]> = async ({
  queryKey,
}) => {
  try {
    const id = queryKey[1];

    // const apiRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/${id}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Cache-Control": "no-cache",
    //     Pragma: "no-cache",
    //     Expires: "0",
    //   },
    // });
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL_KUBERNETES}/api/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    if (!apiRes.ok) {
      throw new Error(`pet/${id} fetch not ok`);
    }

    const data = await apiRes.json();

    return data.data;
  } catch (error) {
    throw new Error("Error en fetchPet:", error);
  }
};

export default fetchPet;
