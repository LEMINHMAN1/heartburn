import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CheckIcon } from "modules/components/icon";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: solid 2px #eee;
  background: #fff;
  color: #6accb9;
  margin: 5px;
  padding: 0.5rem;
  border-radius: 50px;
  height: 3rem;
  padding-top: 10px;
  cursor: pointer;
  .content {
    flex-grow: 1;
    text-align: center;
    margin-right: -1.5rem;
  }
  .icon {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    padding: 0.25rem;
    background: #fff;
    opacity: 0;
  }
  &.selected {
    background: #6accb9;
    color: #fff;
    border: unset;
    .content {
      margin-top: 0.15rem;
    }
    .icon {
      opacity: 1;
    }
  }
`;

const Comp = ({ text, selected = false, onClick = {} }) => {
  return (
    <>
      <Wrapper onClick={onClick} className={`option-group ${selected && "selected"}`}>
        <div className="content">{text}</div>
        <CheckIcon className="icon" />
      </Wrapper>
    </>
  );
};

Comp.propTypes = {
  text: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Comp;
