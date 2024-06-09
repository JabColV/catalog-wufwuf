"use client";

import { Formik } from "formik";
import { useMutation } from "react-query";
import { validationSchema } from "@utils/functions";
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { uploadFile } from "@firebase/config";
import SendPet from "@api/send_pet";
import UpdatePet from "@api/update_pet";
import Loader from "./Loader";
import CustomImage from "./CustomImage";

const Form = ({ accion, data, id }: { accion: string; data: any, id:any }) => {
 
  const {
    mutate: createMutation,
    isLoading: createLoading,
    isError: createError,
  } = useMutation("createPet", SendPet);

  const { mutate: updateMutation, isLoading: updateLoading, } = useMutation((data) => UpdatePet(data, id));

  const [images, setImages] = useState<File[]>([]);
  const dataUrlImages = data.urls_images;
  const router = useRouter();

  const handleFormSubmit = async (values: any) => {
    const imageUrls: String[] = [];
    if (images.length > 0) {
      // Subir todas las imágenes y obtener sus URLs
      for (const image of images) {
        const url = await uploadFile("pets", image);
        imageUrls.push(url);
      }
    }

    console.log("Oee no está vacío", dataUrlImages);
    const petData = {
      name: values.name,
      birth_date: values.birth_date,
      especie: values.especie,
      breed: values.breed,
      urls_images: imageUrls.length > 0 ? imageUrls : dataUrlImages,
      description: values.description,
    };
    try {
      if (accion === "update") {
        await updateMutation(petData);
      } else {
        await createMutation(petData);
      }
      if (!createError) {
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
          if (router){
            router.push("/service-pets/catalogo");
          }
        });
      }
    } catch (error) {
      console.error("Error:", error);
      // Manejo de errores
    }
  };

  if (createLoading) {
    // Si createLoading es true, se está cargando la consulta, muestra un indicador de carga o cualquier otro componente de carga que desees
    return <Loader />;
  }

  if (updateLoading) {
    // Si updateLoading es true, se está cargando la consulta, muestra un indicador de carga o cualquier otro componente de carga que desees
    return <Loader />;
  }

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
                const selectedFiles = Array.from(
                  event.target.files ?? []
                ) as File[];
                setImages(selectedFiles);
                setFieldValue("urls_images", selectedFiles);
              }}
              onBlur={handleBlur}
              className="form-input border border-olivine-700 focus:border-olivine-600 m-0 p-0 h-10 w-full rounded-md file:h-full file:bg-olivine-700 file:text-white file:border-none"
            />
            <div className="flex flex-row gap-2 justify-center mt-2">
              {dataUrlImages.length > 0
                ? 
                // Si hay imágenes URL disponibles
                  dataUrlImages.map((image, index) => (
                    <CustomImage
                      key={index}
                      className="w-50 h-50 rounded-md"
                      src={image}
                      alt="imagen de una mascota"
                      width={50}
                      height={50}
                    />
                  ))
                : // Si no hay imágenes URL disponibles, mostramos las imágenes cargadas
                  images &&
                  images.map(
                    (image, index) =>
                      index < 4 && (
                        <CustomImage
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
