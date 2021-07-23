import React, { Fragment, useState, useEffect } from "react";

import Header from "./components/Header";
import Form from "./components/Form";
import Weather from "./components/Weather";
import Error from "./components/Error";

function App() {
  //[estados, actualizador]
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: ""
  });

  //[estados, actualizador]
  const [consultar, setConsultar] = useState(false);
  //[estados, actualizador]
  const [resultado, setResultado] = useState({});
  //[estados, actualizador]
  const [error, setError] = useState(false);

  //desesctructuramos datos desde busqueda
  const { ciudad, pais } = busqueda;

  //valida, envia la peticion a la API y actualiza a cada cmabio de estado de consultar
  useEffect(() => {
    if (consultar) {
      //func() que hace las peticiones de manera asincronica
      const consultarAPI = async () => {
        const appId = "2c60cf0dd5ebd88ee5c49ede094edf62";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        
        //actualiza estados
        setResultado(resultado);
        setConsultar(false);

        //valida el codigo de estado de la respuesta
        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      };
      consultarAPI();
    }
    // eslint-disable-next-line
  }, [consultar]);

  //inicializa la variable componente
  let componente;


  //valida el estado erro, de ser true componente es igual a Error, de ser false el componente es Weather
  if (error) {
    componente = <Error titulo="No hay resultados" />;
  } else {
    componente = <Weather resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
