"use client";

import fetchPets from "@api/get_all_pets";
import DataTablePets from "@components/DataTablePets";
import Loader from "@components/Loader";
import { PetsAPIResponse } from "@types/types";
import { useQuery } from "react-query";

const ListPets = () => {
  const { data, status, isLoading, refetch } = useQuery<PetsAPIResponse>(
    "pets",
    fetchPets
  );
  let animals: PetsAPIResponse | undefined;

  if (isLoading) {
    // Si isLoading es true, se está cargando la consulta, muestra un indicador de carga o cualquier otro componente de carga que desees
    return <Loader />;
  }

  if (status === "success") {
    // Solo asigna `data` a `animals` si el estado de la consulta es exitoso (`success`)
    animals = data as PetsAPIResponse;
  }
  return (
    <div>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Listado de mascotas{" "}
      </h1>
      {animals && <DataTablePets pets={animals} />}
    </div>
  );
};

export default ListPets;
