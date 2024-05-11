"use client";

import fetchPet from "@api/get_pet";
import Error from "@components/Error";
import Form from "@components/Form";
import Loader from "@components/Loader";
import { Animal, ParamsProps } from "@types/types";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const UpdatePet = ({ params }: ParamsProps) => {
  const [dataToSend, setDataToSend] = useState(null);
  // Buscar la mascota con el id que se recibe en params
  const { data, status, isLoading, isError } = useQuery<Animal>(
    ["pet", params.id],
    fetchPet
  );

  useEffect(() => {
    if (status === "success" && data) {
      const sent_data = {
        name: data.name,
        birth_date: data.birth_date,
        especie: data.especie,
        breed: data.breed,
        urls_images: data.urls_images,
        description: data.description,
      };
      setDataToSend(sent_data);
      console.log("dataToSend", sent_data);
    }
  }, [status, data]);

  if (isLoading) {
    // Si isLoading es true, se está cargando la consulta, muestra un indicador de carga o cualquier otro componente de carga que desees
    return <Loader />;
  }

  if (isError) {
    // Si isError es true, hubo un error en la consulta, muestra un componente de error
    return <Error />;
  }

  return (
    <div>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Actualizar Mascota con id: {params.id}
      </h1>
      {dataToSend && <Form accion="update" data={dataToSend} />}
    </div>
  );
};

export default UpdatePet;
