interface CardProps {
  url_image: string;
  name_animal: string;
  etapa_animal: string;
}

type Animal = {
  id: number;
  name: string;
  date_birth: Date;
  especie: string;
  breed: string;
  images: string[];
  description: string;
};

interface ParamsProps {
  params: {
    id: string;
  };
}

interface AnimalGalleryProps {
  animal_info: Animal;
}
