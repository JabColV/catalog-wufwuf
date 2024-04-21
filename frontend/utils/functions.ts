import * as Yup from 'yup';

export const calcularEtapaVida = (date_birth: Date): string => {
    const hoy = new Date();
    const edad = hoy.getFullYear() - date_birth.getFullYear();
    return edad <= 1 ? "Cachorro" : edad <= 7 ? "Adulto" : "Senior";
  };


export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Este campo es requerido'),
    birth_date: Yup.string().required('Este campo es requerido'),
    especie: Yup.string().required('Este campo es requerido'),
    breed: Yup.string().required('Este campo es requerido'),
    imagen_actual: Yup.string().required('Este campo es requerido'),
    urls_images: Yup.array().of(Yup.string().required('Este campo es requerido')),
    description: Yup.string().required('Este campo es requerido'),
});

// export const fileToBase64 = (file: File): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
// };


// export const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };
