"use client";

import DataTable from "react-data-table-component";
import { PetsAPIResponse } from "@types/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import PatchAdoptionField from "@api/path_adopted";
import CustomImage from "./CustomImage";

const DataTablePets = ({ pets }: { pets: PetsAPIResponse }) => {
  const router = useRouter();
  const columns = [
    {
      name: "Identificador",
      selector: (row) => row.identificador,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Fecha de nacimiento",
      selector: (row) => row.fecha_nacimiento,
      sortable: true,
    },
    {
      name: "Especie",
      selector: (row) => row.especie,
    },
    {
      name: "Raza",
      selector: (row) => row.raza,
    },
    {
      name: "Estado",
      selector: (row) => row.adopted,
    },
    {
      name: "Fecha de creación",
      selector: (row) => row.fecha_creacion,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>
            <CustomImage
              className="transform scale-x-[-1]"
              src={"/assets/icons/usuario.png"}
              alt="icono de perro"
              width={30}
              height={30}
            />
          </button>
          <button onClick={() => handleAdopted(row)}>
            <CustomImage
              className="transform scale-x-[-1]"
              src={"/assets/icons/pet_fingerprint.png"}
              alt="icono de perro"
              width={30}
              height={30}
            />
          </button>
        </>
      ),
    },
  ];

  const data = pets.map((pet) => {
    return {
      identificador: pet.id,
      nombre: pet.name,
      fecha_nacimiento: pet.birth_date,
      especie: pet.especie,
      raza: pet.breed,
      adopted: pet.adopted ? "Adoptado" : "Sin adoptar",
      fecha_creacion: pet.creation_date,
    };
  });

  const [records, setRecords] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRecords = data.filter((record) => {
      return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(filteredRecords);
  };

  const { mutate, isLoading, isError } = useMutation(
    (pet_id: number) => PatchAdoptionField(pet_id),
    {
      onSuccess: (_, pet_id) => {
        setRecords((prevRecords) =>
          prevRecords.map((record) =>
            record.identificador === pet_id
              ? {
                  ...record,
                  adopted:
                    record.adopted === "Adoptado" ? "Sin adoptar" : "Adoptado",
                }
              : record
          )
        );
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "El estado ha sido modificado.",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    }
  );

  const handleEdit = (row) => {
    router.push(`service-pets/lista_mascotas/${row.identificador}`);
  };

  const handleAdopted = (row) => {
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: `¿Esta mascota con identificador ${row.identificador} ${
        row.adopted === "Sin adoptar"
          ? "ha sido adoptada"
          : "no ha sido adoptada"
      }?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${
        row.adopted === "Sin adoptar"
          ? "Si, fue adoptada"
          : "No, no ha sido adoptada"
      }`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(row.identificador);
      }
    });
  };

  return (
    <div className="mx-auto mt-4 w-9/12">
      <input
        type="text"
        className="w-3/5 mx-auto mt-4 p-2 border-2 border-gray-300 rounded-md"
        placeholder="Buscar mascota por nombre"
        onChange={handleSearch}
      />

      <DataTable
        columns={columns}
        data={records}
        pagination
        paginationPerPage={8}
        fixedHeader
      />
    </div>
  );
};

export default DataTablePets;

// "use client";

// import Image from "next/image";
// import DataTable from "react-data-table-component";
// import { PetsAPIResponse } from "@types/types";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// import { useMutation } from "react-query";
// import PatchAdoptionField from "@api/path_adopted";

// const DataTablePets = ({ pets }: { pets: PetsAPIResponse }) => {
//   const router = useRouter();
//   const columns = [
//     {
//       name: "Identificador",
//       selector: (row) => row.identificador,
//       sortable: true,
//     },
//     {
//       name: "Nombre",
//       selector: (row) => row.nombre,
//       sortable: true,
//     },
//     {
//       name: "Fecha de nacimiento",
//       selector: (row) => row.fecha_nacimiento,
//       sortable: true,
//     },
//     {
//       name: "Especie",
//       selector: (row) => row.especie,
//     },
//     {
//       name: "Raza",
//       selector: (row) => row.raza,
//     },
//     {
//       name: "Estado",
//       selector: (row) => row.adopted,
//     },
//     {
//       name: "Fecha de creación",
//       selector: (row) => row.fecha_creacion,
//       sortable: true,
//     },
//     {
//       name: "Acciones",
//       cell: (row) => (
//         <>
//           <button onClick={() => handleEdit(row)}>
//             <Image
//               className="transform scale-x-[-1]"
//               src={"/assets/icons/edit.svg"}
//               alt="icono de perro"
//               width={30}
//               height={30}
//             />
//           </button>
//           <button onClick={() => handleAdopted(row)}>
//             <Image
//               className="transform scale-x-[-1]"
//               src={"/assets/icons/pet_fingerprint.png"}
//               alt="icono de perro"
//               width={30}
//               height={30}
//             />
//           </button>
//         </>
//       ),
//     },
//   ];

//   const data = pets.map((pet) => {
//     return {
//       identificador: pet.id,
//       nombre: pet.name,
//       fecha_nacimiento: pet.birth_date,
//       especie: pet.especie,
//       raza: pet.breed,
//       adopted: pet.adopted ? "Adoptado" : "Sin adoptar",
//       fecha_creacion: pet.creation_date,
//     };
//   });

//   const [records, setRecords] = useState(data);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const filteredRecords = data.filter((record) => {
//       return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
//     });
//     setRecords(filteredRecords);
//   };
//   const { mutate, isLoading, isError } = useMutation((pet_id) => PatchAdoptionField(pet_id));

//   const handleEdit = (row) => {
//     router.push(`/lista_mascotas/${row.identificador}`);
//   };

//   const handleAdopted = (row) => {
//     Swal.fire({
//       icon: "warning",
//       title: "¿Estás seguro?",
//       text: `¿Esta mascota con identificador ${
//         row.identificador
//       } ${row.adopted == "Sin adoptar" ? "ha sido adoptada" : "no ha sido adoptada"}?`,
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: `${row.adopted == "Sin adoptar" ? "Si, fue adoptada" : "No, no ha sido adoptada"}`,
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         mutate(row.identificador);
//         if (!isError){
//           Swal.fire({
//             icon: "success",
//             title: "¡Éxito!",
//             text: "El estado ha sido modificado.",
//             timer: 2000,
//             timerProgressBar: true,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });

//   };

//   return (
//     <div className="mx-auto mt-4 w-9/12">
//       <input
//         type="text"
//         className="w-3/5 mx-auto mt-4 p-2 border-2 border-gray-300 rounded-md"
//         placeholder="Buscar mascota por nombre"
//         onChange={handleSearch}
//       />

//       <DataTable
//         columns={columns}
//         data={records}
//         pagination
//         paginationPerPage={8}
//         fixedHeader
//       />
//     </div>
//   );
// };

// export default DataTablePets;
