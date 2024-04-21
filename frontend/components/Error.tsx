import Image from "next/image";

const Error = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex items-center flex-col bg-olivine-300">
      <Image
        width={300}
        height={300}
        src={"/assets/dogs_images_optimized/no_encontrado.png"}
        alt="img perrito triste"
        className="mt-32"
      />
      <p className="text-2xl font-bold text-olivine-700">
        Mascota no encontrada
      </p>
    </div>
  );
};

export default Error;
