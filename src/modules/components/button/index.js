import React from "react";
import PropTypes from "prop-types";
import { ArrowRightIcon } from "modules/components/icon";
import "./stylesheet.scss";

const Comp = ({ text = "Next", disabled=false, onClick }) => {
  return (
    <button type='button' onClick={onClick} className={`button-group btn btn-default ${disabled && 'disabled'}`}>
      <div>{text}</div>
      <ArrowRightIcon />
    </button>
  );
};

Comp.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Comp;
