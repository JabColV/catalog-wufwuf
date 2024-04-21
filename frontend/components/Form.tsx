"use client";

import SendPet from "@api/send_pet";
import { Formik } from "formik";
import { useMutation } from "react-query";
import { validationSchema } from "@utils/functions";
import { useState } from "react";
import Image from "next/image";

const Form = () => {
  const { mutate, status, isLoading, isError, error } = useMutation(
    "sendPet",
    SendPet
  );
  const [images, setImages] = useState<File[]>([]);
  const [url, setURL] = useState<string[]>([]);

  return (
    <Formik
      initialValues={{
        name: "",
        birth_date: "",
        especie: "",
        breed: "",
        urls_images: [],
        description: "",
      }}
    onSubmit={(values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("birth_date", values.birth_date);
        formData.append("especie", values.especie);
        formData.append("breed", values.breed);
        formData.append("description", values.description);
        images.forEach((image, index) => {
            formData.append(`urls_images[${url.length + index}]`, image);
        });
        mutate(formData);
    }}
      //   validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form
          className="p-5 border w-1/2 mx-auto rounded-lg"
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
              className="w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none"
            />
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
              className="w-4/5 p-2 border rounded-lg focus:border-olivine-700 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="especie" className="p-2 flex items-center">
              Especie
            </label>
            <input
              id="especie"
              type="text"
              value={values.especie}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none"
            />
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
              className="w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none"
            />
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
              }}
              onBlur={handleBlur}
              className="w-full p-2 rounded-lg focus:border-olivine-700 focus:outline-none"
            />
            <div className="flex flex-row gap-2 justify-center">
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
          </div>
          <div>
            <label htmlFor="description" className="p-2 flex items-center">
              Descripcion
            </label>
            <input
              id="description"
              type="text"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none"
            />
          </div>
          <button
            className="w-full h-10 mt-4 rounded-lg bg-olivine-700"
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
// {
//     "name": "Max",
//     "birth_date": "2008-2-01",
//     "especie": "Perro",
//     "breed": "Pastor alemán",
//     "urls_images": ["http://127.0.0.1:8000/static/dog1-0.jpg","http://127.0.0.1:8000/static/dog1-1.jpg","http://127.0.0.1:8000/static/dog1-2.jpg"],
//     "description": "Max es un pastor alemán cariñoso y juguetón. Tiene un pelaje hermoso y una mirada amigable que ilumina cualquier habitación. Le encanta correr por el parque y jugar con su pelota favorita. Es un compañero leal que siempre está listo para aventuras emocionantes."
// }

// import { Formik } from 'formik';

// const Form = ({ initialValues, onSubmit, validationSchema, children }) => {
//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={onSubmit}
//       validationSchema={validationSchema}
//     >
//       {children}
//     </Formik>
//   );
// };
