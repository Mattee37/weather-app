import React, { useState } from "react";
import PropTypes from "prop-types";

import Error from "./Error";

const Form = ({ busqueda, setBusqueda, setConsultar }) => {
  //[estados, actualizador]
  const [error, setError] = useState(false);

  //desestructuramos los datos desde busqueda
  const { ciudad, pais } = busqueda;

  //setteamos cada value a su key correspondiente
  const setDatos = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  //previene el actuar predeterminado del form, valida y actualiza estados
  const enviarDatos = e => {
    e.preventDefault();

    //valida los datos del form
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return;
    }
    //actualiza estados
    setError(false);
    setConsultar(true);
  };

  return (
    <form onSubmit={enviarDatos}>
      {error ? <Error titulo="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={setDatos}
        />
        <label htmlFor="ciudad">Ciudad</label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={setDatos}>
          <option value="">-- Seleccione un pais --</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">Pais</label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired
};

export default Form;
