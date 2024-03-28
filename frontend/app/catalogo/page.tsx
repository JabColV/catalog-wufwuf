import Card from "@components/Card";
import Link from "next/link";
import { animals } from "@data/data";

const Catalogo = () => {
  const calcularEtapaVida = (date_birth: Date): string => {
    const hoy = new Date();
    const edad = hoy.getFullYear() - date_birth.getFullYear();
    return edad <= 1 ? "Cachorro" : edad <= 7 ? "Adulto" : "Senior";
  };

  return (
    <>
      <h1 className="text-4xl text-center mt-8 text-olivine-800 font-extrabold mb-9">
        Catálogo de animales
      </h1>
      <div className="w-3/5 flex flex-wrap justify-center mx-auto">
        {animals.map((animal: Animal) => (
          <Link href={`/catalogo/${animal.id}`} key={animal.id}>
            <Card
              url_image={animal.images[0]}
              name_animal={animal.name}
              etapa_animal={calcularEtapaVida(animal.date_birth)}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Catalogo;
