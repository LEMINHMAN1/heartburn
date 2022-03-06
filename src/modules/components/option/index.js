import React from "react";
import PropTypes from "prop-types";
import { CheckIcon } from "modules/components/icon";
import './stylesheet.scss';

const Comp = ({ text, selected = false, onClick={} }) => {
  return (
    <>
      <div onClick={onClick} className={`option-group ${selected && 'selected'}`}>
        <div className="content">{text}</div>
        <CheckIcon className="icon" />
      </div>
    </>
  );
};

Comp.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Comp;
