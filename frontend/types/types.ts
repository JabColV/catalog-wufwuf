interface CardProps {
  url_image: string;
  name_animal: string;
  etapa_animal: string;
}

export type Animal = {
  id: number;
  name: string;
  date_birth: Date;
  especie: string;
  breed: string;
  urls_images: string[];
  description: string;
  creation_date: Date;
};

interface ParamsProps {
  params: {
    id: string;
  };
}

interface AnimalGalleryProps {
  animal_info: Animal;
}

export type PetsAPIResponse = Animal[];