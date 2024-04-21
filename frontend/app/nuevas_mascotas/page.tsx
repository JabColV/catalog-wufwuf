import Form from "@components/Form";

const NuevasMascotas = () => {
  return (
    <div className="bg-olivine-fondo min-h-screen flex flex-col justify-center items-center p-5">
      <h1 className="text-center text-5xl text-olivine-200 font-bold mb-5">
        Nueva Mascota
      </h1>
      <Form />
    </div>
  );
};

export default NuevasMascotas;
