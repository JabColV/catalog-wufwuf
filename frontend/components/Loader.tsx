import React from "react";
import CustomImage from "./CustomImage";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <button type="button" className="w-32 h-32" disabled>
        <CustomImage
          src="/assets/icons/loader.gif"
          alt="loading"
          width={100}
          height={100}
        />
        <p className="mt-7 text-2xl font-semibold text-olivine-700">
          {" "}
          Cargando...
        </p>
      </button>
    </div>
  );
};

export default Loader;
