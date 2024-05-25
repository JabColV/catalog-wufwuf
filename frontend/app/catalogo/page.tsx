"use client";

import Card from "@components/Card";
import Link from "next/link";
import { PetsAPIResponse, Animal } from "@types/types";
import { useQuery } from "react-query";
import { calcularEtapaVida } from "@utils/functions";
import Loader from "@components/Loader";
import { useEffect } from "react";
import fetchPets from "@api/get_all_pets";

const Catalogo = () => {
  const { data, status, isLoading, refetch } = useQuery<PetsAPIResponse>(
    "pets",
    fetchPets
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
    <>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Catálogo de animales
      </h1>
      <div className="w-4/5 flex flex-wrap justify-center mx-auto gap-3 mb-7">
        {animals &&
          animals.map((animal: Animal) => (
            <Link href={`/catalogo/${animal.id}`} key={animal.id}>
              <Card
                url_image={animal.urls_images[0]}
                name_animal={animal.name}
                etapa_animal={calcularEtapaVida(new Date(animal.creation_date))}
              />
            </Link>
          ))}
      </div>
    </>
  );
};

export default Catalogo;
