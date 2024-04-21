import * as Yup from 'yup';

export const calcularEtapaVida = (date_birth: Date): string => {
    const hoy = new Date();
    const edad = hoy.getFullYear() - date_birth.getFullYear();
    return edad <= 1 ? "Cachorro" : edad <= 7 ? "Adulto" : "Senior";
  };


export const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    birth_date: Yup.string().required('La fecha de nacimiento es requerida'),
    especie: Yup.string().required('La especie es requerida'),
    breed: Yup.string().required('La raza es requerida'),
    urls_images: Yup.array()
    .of(Yup.mixed().required('El archivo es requerido'))
    .min(1, 'Debe incluir al menos una imagen')
    .max(6, 'Solo se permiten hasta 6 imágenes'),
    description: Yup.string().required('La descripción es requerida'),
});




