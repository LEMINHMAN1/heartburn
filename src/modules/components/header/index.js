import React from "react";
import { ArrowLeftIcon } from "modules/components/icon";
import PropTypes from "prop-types";
import "./stylesheet.scss";

const Comp = ({disabled, onBack, title = "Heartburn Checker", percentCompleted=0 }) => {
  return (
    <div className="header-group noselect">
      <div className="title">
        <div onClick={onBack} className="back">
          <ArrowLeftIcon fill={disabled ? '#ccc' : '#6accb9'} />
        </div>
        <div className="text">{title}</div>
      </div>
      <div className="line">
        <hr className="total" />
        <hr className="complete" style={{width:`${percentCompleted}%`}} />
      </div>
    </div>
  );
};

Comp.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  percentCompleted: PropTypes.number
};

export default Comp;
