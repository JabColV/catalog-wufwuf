import Swal from "sweetalert2";

const removePet = async (id: number) => {
  try {
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mascotas/eliminar/${id}`
    );
    if (!apiRes.ok) {
      throw new Error(
        `Error fetching /mascotas/eliminar: ${apiRes.statusText}`
      );
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Ha ocurrido un error al crear la mascota. Por favor, intenta de nuevo.",
    });
  }
};

export default removePet;
