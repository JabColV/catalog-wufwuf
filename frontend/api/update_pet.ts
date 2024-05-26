import Swal from "sweetalert2";

const UpdatePet = async (pet: any, id: any) => {
  try {
    console.log("pet a editar", pet);
    // const apiRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/update_pet/${id}`,
    //   {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(pet),
    //   }
    // );
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL_KUBERNETES}/api/update_pet/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
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

export default UpdatePet;
