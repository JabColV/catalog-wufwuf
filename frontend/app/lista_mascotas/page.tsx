"use client";

import fetchAllPets from "@api/get_all_pets";
import DataTablePets from "@components/DataTablePets";
import Loader from "@components/Loader";
import { PetsAPIResponse } from "@types/types";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const ListPets = () => {
  const [breed, setBreed] = useState<string>("");
  const [especie, setEspecie] = useState<string>("");
  const [etapa, setEtapa] = useState<string>("");
  const [age_min, setAgeMin] = useState<number | undefined>(undefined);
  const [age_max, setAgeMax] = useState<number | undefined>(undefined);

  const { data, status, isLoading, refetch } = useQuery<PetsAPIResponse>(
    ["pets", { breed, especie, age_min, age_max }],
    fetchAllPets
  );
  let animals: PetsAPIResponse | undefined;

  useEffect(() => {
    refetch();
  }, []);

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
