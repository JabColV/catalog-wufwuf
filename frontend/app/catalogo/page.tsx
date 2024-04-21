"use client";

import Card from "@components/Card";
import Link from "next/link";
import { PetsAPIResponse, Animal } from "@types/types";
import fetchPets from "@api/get_pets";
import { useQuery } from "react-query";
import { calcularEtapaVida } from "@utils/functions";

const Catalogo = () => {
  const { data, status } = useQuery<PetsAPIResponse>("pets", fetchPets);
  let animals: PetsAPIResponse | undefined;

  if (status === "success") {
    // Solo asigna `data` a `animals` si el estado de la consulta es exitoso (`success`)
    animals = data as PetsAPIResponse;
  }

  return (
    <>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Catálogo de animales
      </h1>
      <div className="w-4/5 flex flex-wrap justify-center mx-auto gap-3">
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
