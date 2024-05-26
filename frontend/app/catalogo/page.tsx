"use client";

import Card from "@components/Card";
import Link from "next/link";
import { PetsAPIResponse, Animal } from "@types/types";
import { useQuery } from "react-query";
import { calcularEtapaVida } from "@utils/functions";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import fetchPets from "@api/get_pets";

const Catalogo = () => {

  const [breed, setBreed] = useState<string>("");
  const [especie, setEspecie] = useState<string>("");
  const [etapa, setEtapa] = useState<string>("");
  const [age_min, setAgeMin] = useState<number>();
  const [age_max, setAgeMax] = useState<number>();

  const { data, status, isLoading, refetch } = useQuery<PetsAPIResponse>(
    ["pets", { breed, especie, age_min, age_max }],
    fetchPets
  );

  // const { mutate: updateMutation, isLoading: updateLoading, } = useMutation((data) => UpdatePet(data, id));
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
    console.log("ANIMALES:", animals);
  }

  return (
    <>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Catálogo de animales
      </h1>
      <div className="flex justify-center space-x-3 mb-9">
        <select
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          className="border border-gray-300 rounded-md p-1 w-64"
        >
          <option value="">Filtrar por raza</option>
          <option value="Pastor alemán">Pastor alemán</option>
          <option value="Bulldog francés">Bulldog francés</option>
          <option value="Persa">Persa</option>
          <option value="Siamés">Siamés</option>
          <option value="Shih Tzu">Shih Tzu</option>
          <option value="golden">golden</option>
          <option value="Bengalí">Bengalí</option>
          <option value="Maine Coon">Maine Coon</option>
          <option value="Pitbull">Pitbull</option>
        </select>
        <select
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          className="border border-gray-300 rounded-md p-1 w-64"
        >
          <option value="">Filtrar por especie</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>
        <select
          value={etapa}
          onChange={(e) => {
            setEtapa(e.target.value);
            if (e.target.value === "cachorro") {
              setAgeMin(0);
              setAgeMax(1);
            } else if (e.target.value === "adulto") {
              setAgeMin(1);
              setAgeMax(7);
            } else if (e.target.value === "senior") {
              setAgeMin(7);
              setAgeMax(100);
            } 
            else {
              setAgeMin(undefined);
              setAgeMax(undefined);
            }
          }}
          className="border border-gray-300 rounded-md p-1 w-64"
        >
          <option value="">Filtrar por etapa de vida</option>
          <option value="cachorro">Cachorro</option>
          <option value="adulto">Adulto</option>
          <option value="senior">Senior</option>
        </select>
      </div>
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
