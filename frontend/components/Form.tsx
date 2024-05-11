"use client";

import SendPet from "@api/send_pet";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { validationSchema } from "@utils/functions";
import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import UpdatePet from "@api/update_pet";

const Form = ({ accion, data }: { accion: string; data: any }) => {
  const {
    mutate: createMutation,
    isLoading: createLoading,
    isError: createError,
  } = useMutation("createPet", SendPet);
  const {
    mutate: updateMutation,
    isLoading: updateLoading,
    isError: updateError,
  } = useMutation("updatePet", UpdatePet);
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();

  const handleFormSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("birth_date", values.birth_date);
    formData.append("especie", values.especie);
    formData.append("breed", values.breed);
    formData.append("description", values.description);
    images.forEach((image, index) => {
      formData.append(`urls_images[${index}]`, image);
    });

    try {
      if (accion === "update") {
        await updateMutation(formData);
      } else {
        await createMutation(formData);
      }
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: `La mascota se ha ${
          accion === "update" ? "actualizado" : "creado"
        } correctamente.`,
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        router.push("/catalogo");
      });
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores
    }
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleFormSubmit}
      validationSchema={validationSchema}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        setFieldValue,
      }) => (
        <form
          className="p-5 border w-96 mx-auto rounded-lg bg-white shadow-lg"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="p-2 flex items-center">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-olivine-700 w-full rounded-md"
            />
            {touched.name && errors.name && (
              <div className="text-red-700 font-semibold">{errors.name}</div>
            )}
          </div>
          <div>
            <label htmlFor="birth_date" className="p-2 flex items-center">
              Fecha de nacimiento
            </label>
            <input
              id="birth_date"
              type="date"
              value={values.birth_date}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-olivine-700 w-full rounded-md"
            />
            {touched.birth_date && errors.birth_date && (
              <div className="text-red-700 font-semibold">
                {errors.birth_date}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="especie" className="p-2 flex items-center">
              Especie
            </label>
            <select
              id="especie"
              value={values.especie}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-olivine-700 w-full rounded-md"
            >
              <option value="">Selecciona una especie</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
            {touched.especie && errors.especie && (
              <div className="text-red-700 font-semibold">{errors.especie}</div>
            )}
          </div>
          <div>
            <label htmlFor="breed" className="p-2 flex items-center">
              Breed
            </label>
            <input
              id="breed"
              type="text"
              value={values.breed}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-olivine-700 focus:border-olivine-600 w-full rounded-md"
            />
            {touched.breed && errors.breed && (
              <div className="text-red-700 font-semibold">{errors.breed}</div>
            )}
          </div>
          <div>
            <label htmlFor="urls_images" className="p-2 flex items-center">
              Imágenes
            </label>
            <input
              id="urls_images"
              type="file"
              multiple
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files) as File[];
                setImages(selectedFiles);
                setFieldValue("urls_images", selectedFiles);
              }}
              onBlur={handleBlur}
              className="form-input border border-olivine-700 focus:border-olivine-600 m-0 p-0 h-10 w-full rounded-md file:h-full file:bg-olivine-700 file:text-white file:border-none"
            />
            {values.urls_images && values.urls_images.length > 0 ? (
              <div className="flex flex-row gap-2 justify-center mt-2">
                {values.urls_images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    className="w-50 h-50 rounded-md object-cover"
                    width={50}
                    height={50}
                    src={imageUrl}
                    alt="imagen"
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-row gap-2 justify-center mt-2">
                {images &&
                  images.map(
                    (image, index) =>
                      index < 4 && (
                        <Image
                          key={index}
                          className="w-50 h-50 rounded-md object-cover"
                          width={50}
                          height={50}
                          src={URL.createObjectURL(image)}
                          alt="imagen"
                        />
                      )
                  )}
              </div>
            )}

            {touched.urls_images && errors.urls_images && (
              <div className="text-red-700 font-semibold">
                {errors.urls_images}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="description" className="p-2 flex items-center">
              Descripcion
            </label>
            <textarea
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-olivine-700 w-full rounded-md"
            />
            {touched.description && errors.description && (
              <div className="text-red-700 font-semibold">
                {errors.description}
              </div>
            )}
          </div>
          <button
            className="w-full h-10 mt-4 rounded-lg bg-olivine-800 hover:bg-olivine-600 text-white font-semibold focus:outline-none"
            type="submit"
          >
            Enviar
          </button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
