import * as Yup from "yup";

export const calcularEtapaVida = (date_birth: Date): string => {
  console.log("Fecha de nacimiento:", date_birth);
  const hoy = new Date();
  const edad = hoy.getFullYear() - date_birth.getFullYear();
  const mesNacimiento = date_birth.getMonth();
  const diaNacimiento = date_birth.getDate();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();

  if (edad < 1) {
    return "cachorro";
  } else if (
    edad === 1 &&
    (mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento))
  ) {
    return "cachorro"; // Si tienen menos de un año y aún no ha cumplido su primer año
  } else if (edad < 7) {
    return "adulto";
  } else {
    return "senior";
  }
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  birth_date: Yup.string().required("La fecha de nacimiento es requerida"),
  especie: Yup.string().required("La especie es requerida"),
  breed: Yup.string().required("La raza es requerida"),
  urls_images: Yup.array()
    // .of(
    //   Yup.mixed().test(
    //     "fileSize",
    //     "Sólo se pemiten imágenes con peso máximo de 1MB",
    //     (value) => {
    //       // Verificar si el valor es un objeto de tipo File
    //       if (value instanceof File) {
    //         // Verificar si el tamaño del archivo es menor o igual a 1MB y si es de tipo imagen
    //         if (value.size <= 1024 * 1024 && value.type.startsWith("image/")) {
    //           return true;
    //         }
    //       }
    //     }
    //   )
    // )
    .min(1, "Debe incluir al menos una imagen")
    .max(4, "Solo se permiten hasta 4 imágenes"),
  description: Yup.string().required("La descripción es requerida"),
});
