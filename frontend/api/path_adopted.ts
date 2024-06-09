import Swal from "sweetalert2";

const PatchAdoptionField = async (id: any) => {
  try {
    const apiRes = await fetch(`/api/patch_adopted_pet/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!apiRes.ok) {
      throw new Error(
        `Error fetching /mascotas/actualizar estado de adopcion: ${apiRes.statusText}`
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

export default PatchAdoptionField;
