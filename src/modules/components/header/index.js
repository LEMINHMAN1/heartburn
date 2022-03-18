import React from "react";
import styled from "styled-components";
import { ArrowLeftIcon } from "modules/components/icon";
import PropTypes from "prop-types";

export const Wrapper = styled.div`
  .title {
    margin-top: 0.75rem;
    .back {
      position: absolute;
      width: 2.5rem;
      cursor: pointer;
      margin-top: -0.25rem;
    }
    .text {
      font-size: 0.85rem;
      text-align: center;
      color: #3f6072;
    }
  }
  .line {
    .complete {
      -webkit-box-shadow: 0px 1px 9px 5px rgba(106, 204, 185, 0.1);
      box-shadow: 0px 1px 9px 5px rgba(106, 204, 185, 0.1);
    }
  }
`;

const Comp = ({
  disabled,
  onBack,
  title = "Heartburn Checker",
  percentCompleted = 0,
}) => {
  return (
    <Wrapper className="noselect">
      <div className="title">
        <div onClick={!disabled ? onBack : undefined} className="back">
          <ArrowLeftIcon fill={disabled ? "#ccc" : "#6accb9"} />
        </div>
        <div className="text">{title}</div>
      </div>
      <div className="line">
        <hr className="total" />
        <hr className="complete" style={{ width: `${percentCompleted}%` }} />
      </div>
    </Wrapper>
  );
};

Comp.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  percentCompleted: PropTypes.number,
};

export default Comp;
