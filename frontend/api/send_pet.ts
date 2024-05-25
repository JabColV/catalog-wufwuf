import Swal from "sweetalert2";

const SendPet = async (pet: FormData) => {
  try {
    const apiRes = await fetch(
      `http://localhost:3000/api/create_pet/`,
      {
        method: "POST",
        body: pet,
      }
    );
    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas/crear: ${apiRes.statusText}`);
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ha ocurrido un error al crear la mascota. Por favor, intenta de nuevo.",
    });
  }
};

export default SendPet;