import Image from "next/image";

const Card = (props: CardProps) => {
  const { url_image, name_animal, etapa_animal } = props;
  return (
    <div className="w-64 border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      <div className="relative h-40">
        <Image
          src={url_image}
          layout="fill"
          objectFit="cover"
          alt="dog image"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800 mb-2">
          {name_animal}
        </p>
        <p className="text-sm text-gray-600">{etapa_animal}</p>
      </div>
    </div>
  );
};

export default Card;
