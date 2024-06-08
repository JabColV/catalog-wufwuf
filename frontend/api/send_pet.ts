import Swal from "sweetalert2";

const SendPet = async (pet: any) => {
  try {
    const apiRes = await fetch(
      `/api/create_pet/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      }
    );
    if (!apiRes.ok) {
      throw new Error(`Error fetching /mascotas/crear: ${apiRes.statusText}`);
    }

    const data = await apiRes.json();
    console.log("send_pet ",data);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ha ocurrido un error al crear la mascota. Por favor, intenta de nuevo.",
    });
  }
};

export default SendPet;
