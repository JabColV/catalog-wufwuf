const SendPet = async (pet : FormData) => {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/crear/`, {
      method: 'POST',
      body: pet});

      if (!apiRes.ok) {
        throw new Error(`Error fetching /mascotas/crear: ${apiRes.statusText}`);
    }

    return apiRes.json();
}

export default SendPet;