import React from "react";
import PropTypes from "prop-types";

const Error = ({ titulo }) => {
  return <p className="red darken-4 error">{titulo}</p>;
};

Error.propTypes = {
  titulo: PropTypes.string.isRequired
};

export default Error;
