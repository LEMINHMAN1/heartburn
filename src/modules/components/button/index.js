import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { ArrowRightIcon } from "modules/components/icon";

export const Wrapper = styled.button`
  &.btn:focus {
    outline: none !important;
    box-shadow: unset !important;
  }
  &.btn.btn-default {
    background: #6accb9;
    border: unset;
    color: #fff;
    font-weight: 600;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    padding-top: 0.85rem;
    div {
      flex-grow: 1;
      margin-top: -0.15rem;
    }
    &.disabled {
      background: #eceff1;
      color: #8ba4b2;
      opacity: 1;
      svg {
        fill: #8ba4b2;
        stroke: #8ba4b2;
      }
    }
  }
`;

const Comp = ({ text = "Next", disabled = false, onClick }) => {
  return (
    <Wrapper
      type="button"
      onClick={onClick}
      className={`button-group btn btn-default ${disabled && "disabled"}`}
    >
      <div>{text}</div>
      <ArrowRightIcon />
    </Wrapper>
  );
};

Comp.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Comp;
