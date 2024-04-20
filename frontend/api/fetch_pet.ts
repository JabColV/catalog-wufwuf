const fetchPet = async ({ queryKey }) => {
    const id = queryKey[1];
  
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}http://pets-v2.dev-apis.com/pets?id=${id}`);
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchPet;