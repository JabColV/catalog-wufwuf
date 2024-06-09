"use client";

import AnimalGallery from "@components/AnimalGallery";
import { useEffect, useState } from "react";
import Modal from "@components/Modal";
import { Animal, ParamsProps } from "@types/types";
import { useQuery } from "react-query";
import { calcularEtapaVida } from "@utils/functions";
import Error from "@components/Error";
import Loader from "@components/Loader";
import fetchPet from "@api/get_pet";
import CustomImage from "@components/CustomImage";
import { useRouter } from "next/navigation";

const AnimalDetails = ({ params }: ParamsProps) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { data, status, isLoading, isError, refetch } = useQuery<Animal>(
    ["pet", params.id],
    fetchPet
  );
  let animal: Animal | undefined;

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (!data) return;
    // Guarda el animal seleccionado en el localStorage
    localStorage.setItem('selectedAnimal', JSON.stringify(data));
  }, [data]);

  if (isLoading) {
    // Si isLoading es true, se está cargando la consulta, muestra un indicador de carga o cualquier otro componente de carga que desees
    return <Loader />;
  }

  if (isError) {
    // Si isError es true, hubo un error en la consulta, muestra un componente de error
    return <Error />;
  }

  if (status === "success") {
    // Solo asigna `data` a `animals` si el estado de la consulta es exitoso (`success`)
    animal = data as Animal;
  }

  return (
    <>
      {animal && (
        <div className="mb-11 max-w-7xl mx-auto">
          <div className="flex items-center justify-center mt-8 space-x-3">
            <CustomImage
              src={"/assets/icons/gato.png"}
              alt="icono de perro"
              width={40}
              height={40}
            />
            <h1 className="text-xl sm:text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
              Detalles de {animal.name}
            </h1>
            <CustomImage
              src={"/assets/icons/dogo-argentino.png"}
              alt="icono de perro"
              width={40}
              height={40}
            />
          </div>

          <div className="min-w-80 w-4/5 mx-auto shadow-xl bg-gradient-to-r from-olivine-100 to-olivine-700 p-10 rounded-lg space-y-5 mb-6">
            <AnimalGallery animal_info={animal} />
            <p className="text-2xl text-center font-extrabold text-olivine-900 lg:text-4xl">
              {animal.especie} - {animal.breed} -{" "}
              {calcularEtapaVida(new Date(animal.birth_date))}
            </p>
            {/* <p className="text-xl text-center font-bold text-olivine-700 md:text-2xl">
              Fecha de nacimiento: {animal.birth_date}
            </p> */}
            <p className="w-3/4 mx-auto text-center text-olivine-950">
              {animal.description}
            </p>
          </div>
          {showModal ? (
            <Modal>
              <div className="w-11/12 p-3 bg-olivine-300 rounded-lg mx-auto relative">
                <CustomImage
                  className="absolute top-0 right-0 m-1 cursor-pointer"
                  src="/assets/icons/equis.png"
                  alt="icono de perro"
                  width={40}
                  height={40}
                  onClick={() => setShowModal(false)}
                />
                <h1 className="text-xl text-center font-bold text-olivine-950 mt-9 mb-9">
                  Deseo agendar una cita como:
                </h1>
                <div className="space-y-2">
                  {/* <button className="btn" onClick={() => router.push("/service-scheduling")}> */}
                  <button className="btn">
                    Invitado
                  </button>
                  <button className="btn" onClick={() => router.push("/service-users/login")}>
                    Iniciando Sesión
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
          <button className="btn" onClick={() => setShowModal(true)}>
            Agendar Cita
          </button>
        </div>
      )}
    </>
  );
};

export default AnimalDetails;
