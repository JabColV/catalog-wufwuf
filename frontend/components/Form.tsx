'use client'

import SendPet from '@api/send_pet';
import { Formik } from 'formik';
import { useMutation, useQuery } from 'react-query';
import * as Yup from 'yup';

const Form = () => {

    const onSubmit = (values: object) => {
        console.log(values);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Este campo es requerido'),
        birth_date: Yup.string().required('Este campo es requerido'),
        especie: Yup.string().required('Este campo es requerido'),
        breed: Yup.string().required('Este campo es requerido'),
        imagen_actual: Yup.string().required('Este campo es requerido'),
        urls_images: Yup.array().of(Yup.string().required('Este campo es requerido')),
        description: Yup.string().required('Este campo es requerido'),
    });

    const { mutate, status, isLoading, isError, error } = useMutation('sendPet', SendPet);

  return (
    <Formik
      initialValues={{
        name: '',
        birth_date: '',
        especie: '',
        breed: '',
        imagen_actual: '',
        urls_images: [],
        description: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form className='p-5 border w-1/2 mx-auto rounded-lg' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className='p-2 flex items-center'>Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="birth_date" className='p-2 flex items-center'>Fecha de nacimiento</label>
                    <input
                        id="birth_date"
                        type="date"
                        value={values.birth_date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-4/5 p-2 border rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="especie" className='p-2 flex items-center'>Especie</label>
                    <input
                        id="especie"
                        type="text"
                        value={values.especie}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="breed" className='p-2 flex items-center'>Breed</label>
                    <input
                        id="breed"
                        type="text"
                        value={values.breed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="imagen_actual" className='p-2 flex items-center'>Imagen Actual</label>
                    <input
                        id="imagen_actual"
                        type="file"
                        value={values.imagen_actual}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="urls_images" className='p-2 flex items-center'>Imagenes</label>
                    <input
                        id="urls_images"
                        type="file"
                        value={values.urls_images}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
                <div>
                    <label htmlFor="description" className='p-2 flex items-center'>Descripcion</label>
                    <input
                        id="description"
                        type="text"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className='w-full p-2 border rounded-lg focus:border-olivine-700 focus:outline-none'
                    />
                </div>
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