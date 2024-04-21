interface CardProps {
  url_image: string;
  name_animal: string;
  etapa_animal: string;
}

export type Animal = {
  id: number;
  name: string;
  birth_date: Date;
  especie: string;
  breed: string;
  urls_images: File[];
  description: string;
  creation_date: Date;
};

export interface ParamsProps {
  params: {
    id: string;
  };
}

export interface AnimalGalleryProps {
  animal_info: Animal;
}

export type PetsAPIResponse = Animal[];
