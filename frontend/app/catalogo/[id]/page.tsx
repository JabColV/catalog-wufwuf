'use client'

import AnimalGallery from "@components/AnimalGallery";
import { animals } from "@data/data";
import Image from "next/image";
import { useState } from "react";
import Modal from "@components/Modal";

const AnimalDetails = ({ params }: ParamsProps) => {
  const animal = animals.find((animal) => animal.id === Number(params.id));
  const [showModal, setShowModal] = useState(false);
  const calcularEtapaVida = (date_birth: Date): string => {
    const hoy = new Date();
    const edad = hoy.getFullYear() - date_birth.getFullYear();
    return edad <= 1 ? "Cachorro" : edad <= 7 ? "Adulto" : "Senior";
  };

  return (
    <>
      {animal ? (
        <div className="mb-11 max-w-7xl mx-auto">
          <div className="flex items-center justify-center mt-8 space-x-3">
            {/* {animal.especie === "Gato" ? icon = "/assets/icons/bxs-cat.svg" : icon = "/assets/icons/bxs-dog.svg"} */}
            <Image
              className=""
              src={"/assets/icons/bxs-cat.svg"}
              alt="icono de perro"
              width={40}
              height={40}
            />
            <h1 className="text-xl sm:text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
              Detalles de {animal.name}
            </h1>
            <Image
              className="transform scale-x-[-1]"
              src={"/assets/icons/bxs-dog.svg"}
              alt="icono de perro"
              width={40}
              height={40}
            />
          </div>

          <div className="min-w-80 w-4/5 mx-auto shadow-xl bg-gradient-to-r from-olivine-100 to-olivine-700 p-10 rounded-lg space-y-5 mb-6">
            <AnimalGallery animal_info={animal} />
            <p className="text-2xl text-center font-extrabold text-olivine-900 lg:text-4xl">
              {animal.especie} - {animal.breed} -{" "}
              {calcularEtapaVida(animal.date_birth)}
            </p>
            <p className="text-xl text-center font-bold text-olivine-700 md:text-2xl">
              Fecha de nacimiento: {animal.date_birth.toDateString()}
            </p>
            <p className="w-3/4 mx-auto text-center text-olivine-950">
              {animal.description}
            </p>
          </div>
          {showModal ? (
            <Modal>
              <div className="w-11/12 p-3 bg-olivine-300 rounded-lg mx-auto relative">
                <Image className="absolute top-0 right-0 m-1 cursor-pointer" src="/assets/icons/bx-x-circle.svg" alt="icono de perro" width={40} height={40} onClick={() => setShowModal(false)}/>
                <h1 className="text-xl text-center font-bold text-olivine-950 mt-9 mb-9">Deseo agendar una cita como:</h1>
                <div>
                  <button className="btn">Invitado</button>
                  <button className="btn">Iniciando Sesión</button>
                </div>
              </div>
            </Modal>
          ) : null}
          <button className="btn" onClick={() => setShowModal(true)}>Agendar Cita</button>
        </div>
      ) : null}
    </>
  );
};

export default AnimalDetails;
