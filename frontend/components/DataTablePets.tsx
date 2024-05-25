"use client";

import Image from "next/image";
import DataTable from "react-data-table-component";
import { PetsAPIResponse } from "@types/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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
      name: "Fecha de creación",
      selector: (row) => row.fecha_creacion,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>
            <Image
              className="transform scale-x-[-1]"
              src={"/assets/icons/edit.svg"}
              alt="icono de perro"
              width={30}
              height={30}
            />
          </button>
          <button onClick={() => handleRemove(row)}>
            <Image
              className="transform scale-x-[-1]"
              src={"/assets/icons/trash.svg"}
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

  const handleEdit = (row) => {
    router.push(`/lista_mascotas/${row.identificador}`);
  };

  const handleRemove = (row) => {
    console.log(row);
    Swal.fire({
      icon: "warning",
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar la mascota con identificador ${row.identificador}?`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //removePet(row.identificador);
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "La mascota ha sido eliminada correctamente.",
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="mx-auto mt-4 w-3/5">
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
