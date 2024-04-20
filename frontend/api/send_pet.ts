import { Animal } from '@types/types';

const SendPet = async (pet : Animal) => {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/crear`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet)});

      if (!apiRes.ok) {
        throw new Error(`Error fetching /mascotas/crear: ${apiRes.statusText}`);
    }

    return apiRes.json();
}

export default SendPet;