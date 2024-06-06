import Form from "@components/Form";

const NuevasMascotas = () => {
  const dataPet = {
    name: "",
    birth_date: "",
    especie: "",
    breed: "",
    urls_images: [],
    description: "",
  };
  return (
    <div className="bg-olivine-fondo min-h-screen flex flex-col justify-center items-center p-5">
      <h1 className="text-center text-5xl text-olivine-200 font-bold mb-5">
        Nueva Mascota
      </h1>
      <Form accion="crear" data={dataPet} id={0} />
    </div>
  );
};

export default NuevasMascotas;
